var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path="../node_modules/asyncmachine/build/asyncmachine.d.ts"/>
///<reference path="../d.ts/imap.d.ts"/>
///<reference path="../d.ts/global.d.ts"/>
var settings = require('../settings');
var Imap = require("imap");

require("sugar");
var asyncmachine = require('asyncmachine');
var am_task = require('./asyncmachine-task');

Object.merge(settings, {
    gmail_max_results: 300
});

var Query = (function (_super) {
    __extends(Query, _super);
    function Query(connection, name, update_interval) {
        _super.call(this);
        this.HasMonitored = {};
        this.Fetching = {
            blocks: ["Idle"]
        };
        this.Idle = {
            blocks: ["Fetching"]
        };
        this.FetchingQuery = {
            implies: ["Fetching"],
            blocks: ["FetchingResults"]
        };
        this.FetchingResults = {
            implies: ["Fetching"],
            blocks: ["FetchingQuery"]
        };
        this.ResultsFetchingError = {
            implies: ["Idle"]
        };
        this.FetchingMessage = {
            blocks: ["MessageFetched"],
            requires: ["FetchingResults"]
        };
        this.MessageFetched = {
            blocks: ["FetchingMessage"],
            requires: ["FetchingResults"]
        };
        this.active = true;
        this.last_update = 0;
        this.headers = ["id", "from", "to", "subject", "date"];
        this.monitored = [];
        this.connection = null;
        this.name = "*";
        this.update_interval = 10 * 1000;

        this.register("HasMonitored", "Fetching", "Idle", "FetchingQuery", "FetchingResults", "ResultsFetchingError", "FetchingMessage", "MessageFetched");

        this.debug("[query] ");
        this.set("Idle");

        if (connection) {
            this.connection = connection;
        }
        if (name) {
            this.name = name;
        }
        if (update_interval) {
            this.update_interval = update_interval;
        }
    }
    Query.prototype.FetchingQuery_enter = function () {
        var _this = this;
        this.last_update = Date.now();
        this.log("performing a search for " + this.name);
        var imap = this.connection.imap;
        return imap.search([["X-GM-RAW", this.name]], function (err, results) {
            return _this.add("FetchingResults", err, results);
        });
    };

    Query.prototype.FetchingQuery_FetchingResults = function (states, err, results) {
        var _this = this;
        this.log("got search results");
        var imap = this.connection.imap;
        var fetch = imap.fetch(results, this.headers);
        fetch.on("error", this.addLater("ResultsFetchingError"));
        fetch.on("end", function () {
            _this.add("HasMonitored");
            return _this.drop("FetchingResults");
        });
        return fetch.on("message", function (msg) {
            return _this.add("FetchingMessage", msg);
        });
    };

    Query.prototype.FetchingMessage_enter = function (states, msg) {
        var _this = this;
        return msg.on("end", function () {
            return _this.add("MessageFetched", msg);
        });
    };

    Query.prototype.FetchingMessage_MessageFetched = function (states, msg) {
        var id = msg["x-gm-msgid"];
        if (!~this.monitored.indexOf(id)) {
            var labels = msg["x-gm-labels"].join(", ");
            this.log("New msg \"" + msg.headers.subject + "\" (" + labels + ")");
            return this.monitored.push(id);
        }
    };

    Query.prototype.ResultsFetchingError_enter = function (err) {
        this.log("fetching error", err);
        setTimeout(this.addLater("Idle"), 0);
        if (err) {
            throw new Error(err);
        }
    };

    Query.prototype.repl = function () {
        var repl = repl.start({
            prompt: "repl> ",
            input: process.stdin,
            output: process.stdout
        });
        return repl.context["this"] = this;
    };

    Query.prototype.log = function () {
        var msgs = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            msgs[_i] = arguments[_i + 0];
        }
        return this.log.apply(console, msgs);
    };
    return Query;
})(am_task.Task);
exports.Query = Query;
var Connection = (function (_super) {
    __extends(Connection, _super);
    function Connection(settings) {
        _super.call(this);
        this.max_concurrency = 3;
        this.queries = [];
        this.connection = null;
        this.box_opening_promise = null;
        this.delayed_timer = null;
        this.concurrency = [];
        this.threads = [];
        this.settings = null;
        this.last_promise = null;
        this.Disconnected = {
            blocks: ["Connected", "Connecting", "Disconnecting"]
        };
        this.Disconnecting = {
            blocks: ["Connected", "Connecting", "Disconnected"]
        };
        this.Connected = {
            blocks: ["Connecting", "Disconnecting", "Disconnected"],
            implies: ["BoxClosed"]
        };
        this.Connecting = {
            blocks: ["Connected", "Disconnecting", "Disconnected"]
        };
        this.Idle = {
            requires: ["Connected"]
        };
        this.Active = {
            requires: ["Connected"]
        };
        this.Fetched = {};
        this.Fetching = {
            requires: ["BoxOpened"],
            blocks: ["Idle", "Delayed"]
        };
        this.Delayed = {
            requires: ["Active"],
            blocks: ["Fetching", "Idle"]
        };
        this.BoxOpening = {
            requires: ["Active"],
            blocks: ["BoxOpened", "BoxClosing", "BoxClosed"]
        };
        this.BoxOpened = {
            depends: ["Connected"],
            requires: ["Active"],
            blocks: ["BoxOpening", "BoxClosed", "BoxClosing"]
        };
        this.BoxClosing = {
            blocks: ["BoxOpened", "BoxOpening", "Box"]
        };
        this.BoxClosed = {
            requires: ["Active"],
            blocks: ["BoxOpened", "BoxOpening", "BoxClosing"]
        };
        this.Fetching_Fetching = this.Fetching_enter;

        this.settings = settings;

        this.register("Disconnected", "Disconnecting", "Connected", "Connecting", "Idle", "Active", "Fetched", "Fetching", "Delayed", "BoxOpening", "BoxOpened", "BoxClosing", "BoxClosed");

        this.debug("[connection] ");
        this.set("Connecting");

        if (settings.repl) {
            this.repl();
        }
    }
    Connection.prototype.addQuery = function (query, update_interval) {
        this.queries.push(new Query(this, query, update_interval));
        if (this.is("BoxOpened")) {
            return this.add("Fetching");
        } else if (!this.add("BoxOpening")) {
            return this.log("BoxOpening not set", this.is());
        }
    };

    Connection.prototype.Connected_enter = function (states) {
        return this.set("BoxClosed");
    };

    Connection.prototype.Connected_Disconnected = function () {
        return process.exit();
    };

    Connection.prototype.Connecting_enter = function (states) {
        var data = this.settings;
        this.connection = new Imap({
            user: data.gmail_username,
            password: data.gmail_password,
            host: data.gmail_host || "imap.gmail.com",
            port: 993,
            tls: true,
            debug: console.log.bind(console)
        });

        this.connection.connect();
        return this.connection.once("ready", this.addLater("Connected"));
    };

    Connection.prototype.Connecting_exit = function (target_states) {
        if (~target_states.indexOf("Disconnected")) {
            return true;
        }
    };

    Connection.prototype.Connected_exit = function () {
        return this.connection.logout(this.addLater("Disconnected"));
    };

    Connection.prototype.BoxOpening_enter = function () {
        if (this.is("BoxOpened")) {
            this.add("Fetching", 0);
            return false;
        } else {
            this.once("Box.Opened.enter", this.addLater("Fetching"));
        }
        if (this.box_opening_promise) {
            this.box_opening_promise.reject();
        }
        this.connection.openBox("[Gmail]/All Mail", false, this.addLater("BoxOpened"));
        this.box_opening_promise = this.last_promise;
        return true;
    };

    Connection.prototype.BoxOpening_BoxOpening = function () {
        return this.once("Box.Opened.enter", this.setLater("Fetching"));
    };

    Connection.prototype.BoxOpening_exit = function () {
        var promise = this.box_opening_promise;
        if (promise && !promise.isResolved) {
            return promise.reject();
        }
    };

    Connection.prototype.BoxClosing_enter = function () {
        return this.connection.closeBox(this.addLater("BoxClosed"));
    };

    Connection.prototype.BoxOpened_enter = function () {
        if (!this.add("Fetching")) {
            return this.log("Cant set Fetching", this.is());
        }
    };

    Connection.prototype.Delayed_enter = function () {
        return this.delayed_timer = setTimeout(this.addLater("Fetching"), this.minInterval_());
    };

    Connection.prototype.Delayed_exit = function () {
        return clearTimeout(this.delayed_timer);
    };

    Connection.prototype.Fetching_enter = function () {
        var _this = this;
        if (this.concurrency.length >= this.max_concurrency) {
            return false;
        }
        var queries = this.queries.sortBy("last_update");
        var query = queries.first();
        var i = 0;
        while (query.last_update + query.update_interval > Date.now()) {
            query = queries[i++];
            if (!query) {
                return false;
            }
        }
        this.log("activating " + query.name);
        if (this.concurrency.some(function (s) {
            return s.name === query.name;
        })) {
            return false;
        }
        this.log("concurrency++");
        this.concurrency.push(query);
        query.add("FetchingQuery");
        return query.once("Fetching.Results.exit", function () {
            _this.concurrency = _this.concurrency.filter(function (row) {
                return row !== query;
            });
            _this.log("concurrency--");
            _this.add(["Delayed", "HasMonitored"]);
            return _this.add("Fetching");
        });
    };

    Connection.prototype.Fetching_exit = function (states, args) {
        if (!~states.indexOf("Active")) {
            this.log("cancel fetching");
        }
        if (this.concurrency.length && !args["force"]) {
            return false;
        }
        var exits = this.concurrency.map(function (query) {
            return query.drop("Fetching");
        });
        return !~exits.indexOf(false);
    };

    Connection.prototype.Active_enter = function () {
        return this.add("BoxOpening");
    };

    Connection.prototype.minInterval_ = function () {
        return Math.min.apply(null, this.queries.map(function (ch) {
            return ch.update_interval;
        }));
    };

    Connection.prototype.repl = function () {
        var repl = repl.start({
            prompt: "repl> ",
            input: process.stdin,
            output: process.stdout
        });
        return repl.context["this"] = this;
    };

    Connection.prototype.log = function () {
        var msgs = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            msgs[_i] = arguments[_i + 0];
        }
        return this.log.apply(console, msgs);
    };
    return Connection;
})(asyncmachine.AsyncMachine);
exports.Connection = Connection;
//# sourceMappingURL=gmail.js.map
