import { IState as IStateBase, IBind as IBindBase, IEmit as IEmitBase } from 'asyncmachine/types';
import AsyncMachine from 'asyncmachine';
export { IBindBase, IEmitBase, AsyncMachine };
/** machine.bind('Enabled', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Enabled_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Enabled_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Enabled', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Enabled_enter'): boolean | void;
    (event: 'Enabled_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Enabled_enter?(): boolean | void;
    Enabled_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Initializing', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Initializing_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Initializing_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Initializing', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Initializing_enter'): boolean | void;
    (event: 'Initializing_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Initializing_enter?(): boolean | void;
    Initializing_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Ready', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Ready_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Ready_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Ready', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Ready_enter'): boolean | void;
    (event: 'Ready_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Ready_enter?(): boolean | void;
    Ready_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('ConfigSet', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'ConfigSet_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'ConfigSet_state', listener: () => any, context?: Object): this;
}
/** machine.emit('ConfigSet', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'ConfigSet_enter'): boolean | void;
    (event: 'ConfigSet_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    ConfigSet_enter?(): boolean | void;
    ConfigSet_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('SubsInited', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'SubsInited_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'SubsInited_state', listener: () => any, context?: Object): this;
}
/** machine.emit('SubsInited', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'SubsInited_enter'): boolean | void;
    (event: 'SubsInited_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    SubsInited_enter?(): boolean | void;
    SubsInited_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('SubsReady', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'SubsReady_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'SubsReady_state', listener: () => any, context?: Object): this;
}
/** machine.emit('SubsReady', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'SubsReady_enter'): boolean | void;
    (event: 'SubsReady_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    SubsReady_enter?(): boolean | void;
    SubsReady_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Reading', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Reading_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Reading_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Reading', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Reading_enter'): boolean | void;
    (event: 'Reading_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Reading_enter?(): boolean | void;
    Reading_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('ReadingDone', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'ReadingDone_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'ReadingDone_state', listener: () => any, context?: Object): this;
}
/** machine.emit('ReadingDone', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'ReadingDone_enter'): boolean | void;
    (event: 'ReadingDone_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    ReadingDone_enter?(): boolean | void;
    ReadingDone_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Syncing', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Syncing_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Syncing_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Syncing', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Syncing_enter'): boolean | void;
    (event: 'Syncing_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Syncing_enter?(): boolean | void;
    Syncing_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('SyncDone', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'SyncDone_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'SyncDone_state', listener: () => any, context?: Object): this;
}
/** machine.emit('SyncDone', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'SyncDone_enter'): boolean | void;
    (event: 'SyncDone_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    SyncDone_enter?(): boolean | void;
    SyncDone_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Cached', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Cached_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Cached_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Cached', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Cached_enter'): boolean | void;
    (event: 'Cached_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Cached_enter?(): boolean | void;
    Cached_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Dirty', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Dirty_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Dirty_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Dirty', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Dirty_enter'): boolean | void;
    (event: 'Dirty_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Dirty_enter?(): boolean | void;
    Dirty_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('QuotaExceeded', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'QuotaExceeded_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'QuotaExceeded_state', listener: () => any, context?: Object): this;
}
/** machine.emit('QuotaExceeded', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'QuotaExceeded_enter'): boolean | void;
    (event: 'QuotaExceeded_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    QuotaExceeded_enter?(): boolean | void;
    QuotaExceeded_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Restarting', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Restarting_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Restarting_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Restarting', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Restarting_enter'): boolean | void;
    (event: 'Restarting_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Restarting_enter?(): boolean | void;
    Restarting_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('Restarted', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'Restarted_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'Restarted_state', listener: () => any, context?: Object): this;
}
/** machine.emit('Restarted', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'Restarted_enter'): boolean | void;
    (event: 'Restarted_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    Restarted_enter?(): boolean | void;
    Restarted_state?(): boolean | void | Promise<boolean | void>;
}
/** machine.bind('MaxReadsExceeded', (param1, param2) => {}) */
export interface IBind extends IBindBase {
    (event: 'MaxReadsExceeded_enter', listener: () => boolean | undefined, context?: Object): this;
    (event: 'MaxReadsExceeded_state', listener: () => any, context?: Object): this;
}
/** machine.emit('MaxReadsExceeded', param1, param2) */
export interface IEmit extends IEmitBase {
    (event: 'MaxReadsExceeded_enter'): boolean | void;
    (event: 'MaxReadsExceeded_state'): boolean | void;
}
/** Method declarations */
export interface ITransitions {
    MaxReadsExceeded_enter?(): boolean | void;
    MaxReadsExceeded_state?(): boolean | void | Promise<boolean | void>;
}
/** All the possible transition methods the machine can define */
export interface ITransitions {
    Enabled_Any?(): boolean | void;
    Enabled_Initializing?(): boolean | void;
    Enabled_Ready?(): boolean | void;
    Enabled_ConfigSet?(): boolean | void;
    Enabled_SubsInited?(): boolean | void;
    Enabled_SubsReady?(): boolean | void;
    Enabled_Reading?(): boolean | void;
    Enabled_ReadingDone?(): boolean | void;
    Enabled_Syncing?(): boolean | void;
    Enabled_SyncDone?(): boolean | void;
    Enabled_Cached?(): boolean | void;
    Enabled_Dirty?(): boolean | void;
    Enabled_QuotaExceeded?(): boolean | void;
    Enabled_Restarting?(): boolean | void;
    Enabled_Restarted?(): boolean | void;
    Enabled_MaxReadsExceeded?(): boolean | void;
    Enabled_Exception?(): boolean | void;
    Enabled_exit?(): boolean | void;
    Enabled_end?(): boolean | void | Promise<boolean | void>;
    Initializing_Enabled?(): boolean | void;
    Initializing_Any?(): boolean | void;
    Initializing_Ready?(): boolean | void;
    Initializing_ConfigSet?(): boolean | void;
    Initializing_SubsInited?(): boolean | void;
    Initializing_SubsReady?(): boolean | void;
    Initializing_Reading?(): boolean | void;
    Initializing_ReadingDone?(): boolean | void;
    Initializing_Syncing?(): boolean | void;
    Initializing_SyncDone?(): boolean | void;
    Initializing_Cached?(): boolean | void;
    Initializing_Dirty?(): boolean | void;
    Initializing_QuotaExceeded?(): boolean | void;
    Initializing_Restarting?(): boolean | void;
    Initializing_Restarted?(): boolean | void;
    Initializing_MaxReadsExceeded?(): boolean | void;
    Initializing_Exception?(): boolean | void;
    Initializing_exit?(): boolean | void;
    Initializing_end?(): boolean | void | Promise<boolean | void>;
    Ready_Enabled?(): boolean | void;
    Ready_Initializing?(): boolean | void;
    Ready_Any?(): boolean | void;
    Ready_ConfigSet?(): boolean | void;
    Ready_SubsInited?(): boolean | void;
    Ready_SubsReady?(): boolean | void;
    Ready_Reading?(): boolean | void;
    Ready_ReadingDone?(): boolean | void;
    Ready_Syncing?(): boolean | void;
    Ready_SyncDone?(): boolean | void;
    Ready_Cached?(): boolean | void;
    Ready_Dirty?(): boolean | void;
    Ready_QuotaExceeded?(): boolean | void;
    Ready_Restarting?(): boolean | void;
    Ready_Restarted?(): boolean | void;
    Ready_MaxReadsExceeded?(): boolean | void;
    Ready_Exception?(): boolean | void;
    Ready_exit?(): boolean | void;
    Ready_end?(): boolean | void | Promise<boolean | void>;
    ConfigSet_Enabled?(): boolean | void;
    ConfigSet_Initializing?(): boolean | void;
    ConfigSet_Ready?(): boolean | void;
    ConfigSet_Any?(): boolean | void;
    ConfigSet_SubsInited?(): boolean | void;
    ConfigSet_SubsReady?(): boolean | void;
    ConfigSet_Reading?(): boolean | void;
    ConfigSet_ReadingDone?(): boolean | void;
    ConfigSet_Syncing?(): boolean | void;
    ConfigSet_SyncDone?(): boolean | void;
    ConfigSet_Cached?(): boolean | void;
    ConfigSet_Dirty?(): boolean | void;
    ConfigSet_QuotaExceeded?(): boolean | void;
    ConfigSet_Restarting?(): boolean | void;
    ConfigSet_Restarted?(): boolean | void;
    ConfigSet_MaxReadsExceeded?(): boolean | void;
    ConfigSet_Exception?(): boolean | void;
    ConfigSet_exit?(): boolean | void;
    ConfigSet_end?(): boolean | void | Promise<boolean | void>;
    SubsInited_Enabled?(): boolean | void;
    SubsInited_Initializing?(): boolean | void;
    SubsInited_Ready?(): boolean | void;
    SubsInited_ConfigSet?(): boolean | void;
    SubsInited_Any?(): boolean | void;
    SubsInited_SubsReady?(): boolean | void;
    SubsInited_Reading?(): boolean | void;
    SubsInited_ReadingDone?(): boolean | void;
    SubsInited_Syncing?(): boolean | void;
    SubsInited_SyncDone?(): boolean | void;
    SubsInited_Cached?(): boolean | void;
    SubsInited_Dirty?(): boolean | void;
    SubsInited_QuotaExceeded?(): boolean | void;
    SubsInited_Restarting?(): boolean | void;
    SubsInited_Restarted?(): boolean | void;
    SubsInited_MaxReadsExceeded?(): boolean | void;
    SubsInited_Exception?(): boolean | void;
    SubsInited_exit?(): boolean | void;
    SubsInited_end?(): boolean | void | Promise<boolean | void>;
    SubsReady_Enabled?(): boolean | void;
    SubsReady_Initializing?(): boolean | void;
    SubsReady_Ready?(): boolean | void;
    SubsReady_ConfigSet?(): boolean | void;
    SubsReady_SubsInited?(): boolean | void;
    SubsReady_Any?(): boolean | void;
    SubsReady_Reading?(): boolean | void;
    SubsReady_ReadingDone?(): boolean | void;
    SubsReady_Syncing?(): boolean | void;
    SubsReady_SyncDone?(): boolean | void;
    SubsReady_Cached?(): boolean | void;
    SubsReady_Dirty?(): boolean | void;
    SubsReady_QuotaExceeded?(): boolean | void;
    SubsReady_Restarting?(): boolean | void;
    SubsReady_Restarted?(): boolean | void;
    SubsReady_MaxReadsExceeded?(): boolean | void;
    SubsReady_Exception?(): boolean | void;
    SubsReady_exit?(): boolean | void;
    SubsReady_end?(): boolean | void | Promise<boolean | void>;
    Reading_Enabled?(): boolean | void;
    Reading_Initializing?(): boolean | void;
    Reading_Ready?(): boolean | void;
    Reading_ConfigSet?(): boolean | void;
    Reading_SubsInited?(): boolean | void;
    Reading_SubsReady?(): boolean | void;
    Reading_Any?(): boolean | void;
    Reading_ReadingDone?(): boolean | void;
    Reading_Syncing?(): boolean | void;
    Reading_SyncDone?(): boolean | void;
    Reading_Cached?(): boolean | void;
    Reading_Dirty?(): boolean | void;
    Reading_QuotaExceeded?(): boolean | void;
    Reading_Restarting?(): boolean | void;
    Reading_Restarted?(): boolean | void;
    Reading_MaxReadsExceeded?(): boolean | void;
    Reading_Exception?(): boolean | void;
    Reading_exit?(): boolean | void;
    Reading_end?(): boolean | void | Promise<boolean | void>;
    ReadingDone_Enabled?(): boolean | void;
    ReadingDone_Initializing?(): boolean | void;
    ReadingDone_Ready?(): boolean | void;
    ReadingDone_ConfigSet?(): boolean | void;
    ReadingDone_SubsInited?(): boolean | void;
    ReadingDone_SubsReady?(): boolean | void;
    ReadingDone_Reading?(): boolean | void;
    ReadingDone_Any?(): boolean | void;
    ReadingDone_Syncing?(): boolean | void;
    ReadingDone_SyncDone?(): boolean | void;
    ReadingDone_Cached?(): boolean | void;
    ReadingDone_Dirty?(): boolean | void;
    ReadingDone_QuotaExceeded?(): boolean | void;
    ReadingDone_Restarting?(): boolean | void;
    ReadingDone_Restarted?(): boolean | void;
    ReadingDone_MaxReadsExceeded?(): boolean | void;
    ReadingDone_Exception?(): boolean | void;
    ReadingDone_exit?(): boolean | void;
    ReadingDone_end?(): boolean | void | Promise<boolean | void>;
    Syncing_Enabled?(): boolean | void;
    Syncing_Initializing?(): boolean | void;
    Syncing_Ready?(): boolean | void;
    Syncing_ConfigSet?(): boolean | void;
    Syncing_SubsInited?(): boolean | void;
    Syncing_SubsReady?(): boolean | void;
    Syncing_Reading?(): boolean | void;
    Syncing_ReadingDone?(): boolean | void;
    Syncing_Any?(): boolean | void;
    Syncing_SyncDone?(): boolean | void;
    Syncing_Cached?(): boolean | void;
    Syncing_Dirty?(): boolean | void;
    Syncing_QuotaExceeded?(): boolean | void;
    Syncing_Restarting?(): boolean | void;
    Syncing_Restarted?(): boolean | void;
    Syncing_MaxReadsExceeded?(): boolean | void;
    Syncing_Exception?(): boolean | void;
    Syncing_exit?(): boolean | void;
    Syncing_end?(): boolean | void | Promise<boolean | void>;
    SyncDone_Enabled?(): boolean | void;
    SyncDone_Initializing?(): boolean | void;
    SyncDone_Ready?(): boolean | void;
    SyncDone_ConfigSet?(): boolean | void;
    SyncDone_SubsInited?(): boolean | void;
    SyncDone_SubsReady?(): boolean | void;
    SyncDone_Reading?(): boolean | void;
    SyncDone_ReadingDone?(): boolean | void;
    SyncDone_Syncing?(): boolean | void;
    SyncDone_Any?(): boolean | void;
    SyncDone_Cached?(): boolean | void;
    SyncDone_Dirty?(): boolean | void;
    SyncDone_QuotaExceeded?(): boolean | void;
    SyncDone_Restarting?(): boolean | void;
    SyncDone_Restarted?(): boolean | void;
    SyncDone_MaxReadsExceeded?(): boolean | void;
    SyncDone_Exception?(): boolean | void;
    SyncDone_exit?(): boolean | void;
    SyncDone_end?(): boolean | void | Promise<boolean | void>;
    Cached_Enabled?(): boolean | void;
    Cached_Initializing?(): boolean | void;
    Cached_Ready?(): boolean | void;
    Cached_ConfigSet?(): boolean | void;
    Cached_SubsInited?(): boolean | void;
    Cached_SubsReady?(): boolean | void;
    Cached_Reading?(): boolean | void;
    Cached_ReadingDone?(): boolean | void;
    Cached_Syncing?(): boolean | void;
    Cached_SyncDone?(): boolean | void;
    Cached_Any?(): boolean | void;
    Cached_Dirty?(): boolean | void;
    Cached_QuotaExceeded?(): boolean | void;
    Cached_Restarting?(): boolean | void;
    Cached_Restarted?(): boolean | void;
    Cached_MaxReadsExceeded?(): boolean | void;
    Cached_Exception?(): boolean | void;
    Cached_exit?(): boolean | void;
    Cached_end?(): boolean | void | Promise<boolean | void>;
    Dirty_Enabled?(): boolean | void;
    Dirty_Initializing?(): boolean | void;
    Dirty_Ready?(): boolean | void;
    Dirty_ConfigSet?(): boolean | void;
    Dirty_SubsInited?(): boolean | void;
    Dirty_SubsReady?(): boolean | void;
    Dirty_Reading?(): boolean | void;
    Dirty_ReadingDone?(): boolean | void;
    Dirty_Syncing?(): boolean | void;
    Dirty_SyncDone?(): boolean | void;
    Dirty_Cached?(): boolean | void;
    Dirty_Any?(): boolean | void;
    Dirty_QuotaExceeded?(): boolean | void;
    Dirty_Restarting?(): boolean | void;
    Dirty_Restarted?(): boolean | void;
    Dirty_MaxReadsExceeded?(): boolean | void;
    Dirty_Exception?(): boolean | void;
    Dirty_exit?(): boolean | void;
    Dirty_end?(): boolean | void | Promise<boolean | void>;
    QuotaExceeded_Enabled?(): boolean | void;
    QuotaExceeded_Initializing?(): boolean | void;
    QuotaExceeded_Ready?(): boolean | void;
    QuotaExceeded_ConfigSet?(): boolean | void;
    QuotaExceeded_SubsInited?(): boolean | void;
    QuotaExceeded_SubsReady?(): boolean | void;
    QuotaExceeded_Reading?(): boolean | void;
    QuotaExceeded_ReadingDone?(): boolean | void;
    QuotaExceeded_Syncing?(): boolean | void;
    QuotaExceeded_SyncDone?(): boolean | void;
    QuotaExceeded_Cached?(): boolean | void;
    QuotaExceeded_Dirty?(): boolean | void;
    QuotaExceeded_Any?(): boolean | void;
    QuotaExceeded_Restarting?(): boolean | void;
    QuotaExceeded_Restarted?(): boolean | void;
    QuotaExceeded_MaxReadsExceeded?(): boolean | void;
    QuotaExceeded_Exception?(): boolean | void;
    QuotaExceeded_exit?(): boolean | void;
    QuotaExceeded_end?(): boolean | void | Promise<boolean | void>;
    Restarting_Enabled?(): boolean | void;
    Restarting_Initializing?(): boolean | void;
    Restarting_Ready?(): boolean | void;
    Restarting_ConfigSet?(): boolean | void;
    Restarting_SubsInited?(): boolean | void;
    Restarting_SubsReady?(): boolean | void;
    Restarting_Reading?(): boolean | void;
    Restarting_ReadingDone?(): boolean | void;
    Restarting_Syncing?(): boolean | void;
    Restarting_SyncDone?(): boolean | void;
    Restarting_Cached?(): boolean | void;
    Restarting_Dirty?(): boolean | void;
    Restarting_QuotaExceeded?(): boolean | void;
    Restarting_Any?(): boolean | void;
    Restarting_Restarted?(): boolean | void;
    Restarting_MaxReadsExceeded?(): boolean | void;
    Restarting_Exception?(): boolean | void;
    Restarting_exit?(): boolean | void;
    Restarting_end?(): boolean | void | Promise<boolean | void>;
    Restarted_Enabled?(): boolean | void;
    Restarted_Initializing?(): boolean | void;
    Restarted_Ready?(): boolean | void;
    Restarted_ConfigSet?(): boolean | void;
    Restarted_SubsInited?(): boolean | void;
    Restarted_SubsReady?(): boolean | void;
    Restarted_Reading?(): boolean | void;
    Restarted_ReadingDone?(): boolean | void;
    Restarted_Syncing?(): boolean | void;
    Restarted_SyncDone?(): boolean | void;
    Restarted_Cached?(): boolean | void;
    Restarted_Dirty?(): boolean | void;
    Restarted_QuotaExceeded?(): boolean | void;
    Restarted_Restarting?(): boolean | void;
    Restarted_Any?(): boolean | void;
    Restarted_MaxReadsExceeded?(): boolean | void;
    Restarted_Exception?(): boolean | void;
    Restarted_exit?(): boolean | void;
    Restarted_end?(): boolean | void | Promise<boolean | void>;
    MaxReadsExceeded_Enabled?(): boolean | void;
    MaxReadsExceeded_Initializing?(): boolean | void;
    MaxReadsExceeded_Ready?(): boolean | void;
    MaxReadsExceeded_ConfigSet?(): boolean | void;
    MaxReadsExceeded_SubsInited?(): boolean | void;
    MaxReadsExceeded_SubsReady?(): boolean | void;
    MaxReadsExceeded_Reading?(): boolean | void;
    MaxReadsExceeded_ReadingDone?(): boolean | void;
    MaxReadsExceeded_Syncing?(): boolean | void;
    MaxReadsExceeded_SyncDone?(): boolean | void;
    MaxReadsExceeded_Cached?(): boolean | void;
    MaxReadsExceeded_Dirty?(): boolean | void;
    MaxReadsExceeded_QuotaExceeded?(): boolean | void;
    MaxReadsExceeded_Restarting?(): boolean | void;
    MaxReadsExceeded_Restarted?(): boolean | void;
    MaxReadsExceeded_Any?(): boolean | void;
    MaxReadsExceeded_Exception?(): boolean | void;
    MaxReadsExceeded_exit?(): boolean | void;
    MaxReadsExceeded_end?(): boolean | void | Promise<boolean | void>;
    Exception_Enabled?(): boolean | void;
    Exception_Initializing?(): boolean | void;
    Exception_Ready?(): boolean | void;
    Exception_ConfigSet?(): boolean | void;
    Exception_SubsInited?(): boolean | void;
    Exception_SubsReady?(): boolean | void;
    Exception_Reading?(): boolean | void;
    Exception_ReadingDone?(): boolean | void;
    Exception_Syncing?(): boolean | void;
    Exception_SyncDone?(): boolean | void;
    Exception_Cached?(): boolean | void;
    Exception_Dirty?(): boolean | void;
    Exception_QuotaExceeded?(): boolean | void;
    Exception_Restarting?(): boolean | void;
    Exception_Restarted?(): boolean | void;
    Exception_MaxReadsExceeded?(): boolean | void;
    Exception_exit?(): boolean | void;
    Exception_end?(): boolean | void | Promise<boolean | void>;
}
/** All the state names */
export declare type TStates = 'Enabled' | 'Initializing' | 'Ready' | 'ConfigSet' | 'SubsInited' | 'SubsReady' | 'Reading' | 'ReadingDone' | 'Syncing' | 'SyncDone' | 'Cached' | 'Dirty' | 'QuotaExceeded' | 'Restarting' | 'Restarted' | 'MaxReadsExceeded';
/** All the transition names */
export declare type TTransitions = 'Enabled_Any' | 'Enabled_Initializing' | 'Enabled_Ready' | 'Enabled_ConfigSet' | 'Enabled_SubsInited' | 'Enabled_SubsReady' | 'Enabled_Reading' | 'Enabled_ReadingDone' | 'Enabled_Syncing' | 'Enabled_SyncDone' | 'Enabled_Cached' | 'Enabled_Dirty' | 'Enabled_QuotaExceeded' | 'Enabled_Restarting' | 'Enabled_Restarted' | 'Enabled_MaxReadsExceeded' | 'Enabled_Exception' | 'Enabled_exit' | 'Enabled_end' | 'Initializing_Enabled' | 'Initializing_Any' | 'Initializing_Ready' | 'Initializing_ConfigSet' | 'Initializing_SubsInited' | 'Initializing_SubsReady' | 'Initializing_Reading' | 'Initializing_ReadingDone' | 'Initializing_Syncing' | 'Initializing_SyncDone' | 'Initializing_Cached' | 'Initializing_Dirty' | 'Initializing_QuotaExceeded' | 'Initializing_Restarting' | 'Initializing_Restarted' | 'Initializing_MaxReadsExceeded' | 'Initializing_Exception' | 'Initializing_exit' | 'Initializing_end' | 'Ready_Enabled' | 'Ready_Initializing' | 'Ready_Any' | 'Ready_ConfigSet' | 'Ready_SubsInited' | 'Ready_SubsReady' | 'Ready_Reading' | 'Ready_ReadingDone' | 'Ready_Syncing' | 'Ready_SyncDone' | 'Ready_Cached' | 'Ready_Dirty' | 'Ready_QuotaExceeded' | 'Ready_Restarting' | 'Ready_Restarted' | 'Ready_MaxReadsExceeded' | 'Ready_Exception' | 'Ready_exit' | 'Ready_end' | 'ConfigSet_Enabled' | 'ConfigSet_Initializing' | 'ConfigSet_Ready' | 'ConfigSet_Any' | 'ConfigSet_SubsInited' | 'ConfigSet_SubsReady' | 'ConfigSet_Reading' | 'ConfigSet_ReadingDone' | 'ConfigSet_Syncing' | 'ConfigSet_SyncDone' | 'ConfigSet_Cached' | 'ConfigSet_Dirty' | 'ConfigSet_QuotaExceeded' | 'ConfigSet_Restarting' | 'ConfigSet_Restarted' | 'ConfigSet_MaxReadsExceeded' | 'ConfigSet_Exception' | 'ConfigSet_exit' | 'ConfigSet_end' | 'SubsInited_Enabled' | 'SubsInited_Initializing' | 'SubsInited_Ready' | 'SubsInited_ConfigSet' | 'SubsInited_Any' | 'SubsInited_SubsReady' | 'SubsInited_Reading' | 'SubsInited_ReadingDone' | 'SubsInited_Syncing' | 'SubsInited_SyncDone' | 'SubsInited_Cached' | 'SubsInited_Dirty' | 'SubsInited_QuotaExceeded' | 'SubsInited_Restarting' | 'SubsInited_Restarted' | 'SubsInited_MaxReadsExceeded' | 'SubsInited_Exception' | 'SubsInited_exit' | 'SubsInited_end' | 'SubsReady_Enabled' | 'SubsReady_Initializing' | 'SubsReady_Ready' | 'SubsReady_ConfigSet' | 'SubsReady_SubsInited' | 'SubsReady_Any' | 'SubsReady_Reading' | 'SubsReady_ReadingDone' | 'SubsReady_Syncing' | 'SubsReady_SyncDone' | 'SubsReady_Cached' | 'SubsReady_Dirty' | 'SubsReady_QuotaExceeded' | 'SubsReady_Restarting' | 'SubsReady_Restarted' | 'SubsReady_MaxReadsExceeded' | 'SubsReady_Exception' | 'SubsReady_exit' | 'SubsReady_end' | 'Reading_Enabled' | 'Reading_Initializing' | 'Reading_Ready' | 'Reading_ConfigSet' | 'Reading_SubsInited' | 'Reading_SubsReady' | 'Reading_Any' | 'Reading_ReadingDone' | 'Reading_Syncing' | 'Reading_SyncDone' | 'Reading_Cached' | 'Reading_Dirty' | 'Reading_QuotaExceeded' | 'Reading_Restarting' | 'Reading_Restarted' | 'Reading_MaxReadsExceeded' | 'Reading_Exception' | 'Reading_exit' | 'Reading_end' | 'ReadingDone_Enabled' | 'ReadingDone_Initializing' | 'ReadingDone_Ready' | 'ReadingDone_ConfigSet' | 'ReadingDone_SubsInited' | 'ReadingDone_SubsReady' | 'ReadingDone_Reading' | 'ReadingDone_Any' | 'ReadingDone_Syncing' | 'ReadingDone_SyncDone' | 'ReadingDone_Cached' | 'ReadingDone_Dirty' | 'ReadingDone_QuotaExceeded' | 'ReadingDone_Restarting' | 'ReadingDone_Restarted' | 'ReadingDone_MaxReadsExceeded' | 'ReadingDone_Exception' | 'ReadingDone_exit' | 'ReadingDone_end' | 'Syncing_Enabled' | 'Syncing_Initializing' | 'Syncing_Ready' | 'Syncing_ConfigSet' | 'Syncing_SubsInited' | 'Syncing_SubsReady' | 'Syncing_Reading' | 'Syncing_ReadingDone' | 'Syncing_Any' | 'Syncing_SyncDone' | 'Syncing_Cached' | 'Syncing_Dirty' | 'Syncing_QuotaExceeded' | 'Syncing_Restarting' | 'Syncing_Restarted' | 'Syncing_MaxReadsExceeded' | 'Syncing_Exception' | 'Syncing_exit' | 'Syncing_end' | 'SyncDone_Enabled' | 'SyncDone_Initializing' | 'SyncDone_Ready' | 'SyncDone_ConfigSet' | 'SyncDone_SubsInited' | 'SyncDone_SubsReady' | 'SyncDone_Reading' | 'SyncDone_ReadingDone' | 'SyncDone_Syncing' | 'SyncDone_Any' | 'SyncDone_Cached' | 'SyncDone_Dirty' | 'SyncDone_QuotaExceeded' | 'SyncDone_Restarting' | 'SyncDone_Restarted' | 'SyncDone_MaxReadsExceeded' | 'SyncDone_Exception' | 'SyncDone_exit' | 'SyncDone_end' | 'Cached_Enabled' | 'Cached_Initializing' | 'Cached_Ready' | 'Cached_ConfigSet' | 'Cached_SubsInited' | 'Cached_SubsReady' | 'Cached_Reading' | 'Cached_ReadingDone' | 'Cached_Syncing' | 'Cached_SyncDone' | 'Cached_Any' | 'Cached_Dirty' | 'Cached_QuotaExceeded' | 'Cached_Restarting' | 'Cached_Restarted' | 'Cached_MaxReadsExceeded' | 'Cached_Exception' | 'Cached_exit' | 'Cached_end' | 'Dirty_Enabled' | 'Dirty_Initializing' | 'Dirty_Ready' | 'Dirty_ConfigSet' | 'Dirty_SubsInited' | 'Dirty_SubsReady' | 'Dirty_Reading' | 'Dirty_ReadingDone' | 'Dirty_Syncing' | 'Dirty_SyncDone' | 'Dirty_Cached' | 'Dirty_Any' | 'Dirty_QuotaExceeded' | 'Dirty_Restarting' | 'Dirty_Restarted' | 'Dirty_MaxReadsExceeded' | 'Dirty_Exception' | 'Dirty_exit' | 'Dirty_end' | 'QuotaExceeded_Enabled' | 'QuotaExceeded_Initializing' | 'QuotaExceeded_Ready' | 'QuotaExceeded_ConfigSet' | 'QuotaExceeded_SubsInited' | 'QuotaExceeded_SubsReady' | 'QuotaExceeded_Reading' | 'QuotaExceeded_ReadingDone' | 'QuotaExceeded_Syncing' | 'QuotaExceeded_SyncDone' | 'QuotaExceeded_Cached' | 'QuotaExceeded_Dirty' | 'QuotaExceeded_Any' | 'QuotaExceeded_Restarting' | 'QuotaExceeded_Restarted' | 'QuotaExceeded_MaxReadsExceeded' | 'QuotaExceeded_Exception' | 'QuotaExceeded_exit' | 'QuotaExceeded_end' | 'Restarting_Enabled' | 'Restarting_Initializing' | 'Restarting_Ready' | 'Restarting_ConfigSet' | 'Restarting_SubsInited' | 'Restarting_SubsReady' | 'Restarting_Reading' | 'Restarting_ReadingDone' | 'Restarting_Syncing' | 'Restarting_SyncDone' | 'Restarting_Cached' | 'Restarting_Dirty' | 'Restarting_QuotaExceeded' | 'Restarting_Any' | 'Restarting_Restarted' | 'Restarting_MaxReadsExceeded' | 'Restarting_Exception' | 'Restarting_exit' | 'Restarting_end' | 'Restarted_Enabled' | 'Restarted_Initializing' | 'Restarted_Ready' | 'Restarted_ConfigSet' | 'Restarted_SubsInited' | 'Restarted_SubsReady' | 'Restarted_Reading' | 'Restarted_ReadingDone' | 'Restarted_Syncing' | 'Restarted_SyncDone' | 'Restarted_Cached' | 'Restarted_Dirty' | 'Restarted_QuotaExceeded' | 'Restarted_Restarting' | 'Restarted_Any' | 'Restarted_MaxReadsExceeded' | 'Restarted_Exception' | 'Restarted_exit' | 'Restarted_end' | 'MaxReadsExceeded_Enabled' | 'MaxReadsExceeded_Initializing' | 'MaxReadsExceeded_Ready' | 'MaxReadsExceeded_ConfigSet' | 'MaxReadsExceeded_SubsInited' | 'MaxReadsExceeded_SubsReady' | 'MaxReadsExceeded_Reading' | 'MaxReadsExceeded_ReadingDone' | 'MaxReadsExceeded_Syncing' | 'MaxReadsExceeded_SyncDone' | 'MaxReadsExceeded_Cached' | 'MaxReadsExceeded_Dirty' | 'MaxReadsExceeded_QuotaExceeded' | 'MaxReadsExceeded_Restarting' | 'MaxReadsExceeded_Restarted' | 'MaxReadsExceeded_Any' | 'MaxReadsExceeded_Exception' | 'MaxReadsExceeded_exit' | 'MaxReadsExceeded_end' | 'Exception_Enabled' | 'Exception_Initializing' | 'Exception_Ready' | 'Exception_ConfigSet' | 'Exception_SubsInited' | 'Exception_SubsReady' | 'Exception_Reading' | 'Exception_ReadingDone' | 'Exception_Syncing' | 'Exception_SyncDone' | 'Exception_Cached' | 'Exception_Dirty' | 'Exception_QuotaExceeded' | 'Exception_Restarting' | 'Exception_Restarted' | 'Exception_MaxReadsExceeded' | 'Exception_exit' | 'Exception_end';
/** Typesafe state interface */
export interface IState extends IStateBase<TStates> {
}
/** Subclassable typesafe state interface */
export interface IStateExt<T extends string> extends IStateBase<T | TStates> {
}
export interface IBind extends IBindBase {
    (event: TTransitions, listener: () => boolean | void, context?: Object): this;
}
export interface IEmit extends IEmitBase {
    (event: TTransitions): boolean | void;
}
export interface IJSONStates {
    Enabled: IState;
    Initializing: IState;
    Ready: IState;
    ConfigSet: IState;
    SubsInited: IState;
    SubsReady: IState;
    Reading: IState;
    ReadingDone: IState;
    Syncing: IState;
    SyncDone: IState;
    Cached: IState;
    Dirty: IState;
    QuotaExceeded: IState;
    Restarting: IState;
    Restarted: IState;
    MaxReadsExceeded: IState;
    Exception?: IState;
}
