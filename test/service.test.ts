///<reference path="../typings/index.d.ts"/>

import createHelpers from './helpers'

const scenario = parseInt(process.env['SCENARIO'], 10) || 0
// types for the helpers
type Unpacked<T> = T extends Promise<infer U> ? U : T
let h: Unpacked<ReturnType<typeof createHelpers>>

jest.setTimeout(15 * 1000)
beforeAll(async function() {
  h = await createHelpers()
})
beforeAll(async function() {
  await h.gmail_sync.createLabelsIfMissing([
    'P/project_1',
    'P/project_2',
    'P/project_3'
  ])
})
if (process.env['MOCK']) {
  beforeEach(() => {
    h.sync.subs.google.honor_quotas = false
  })
}
afterAll(function() {
  if (h) {
    h.printDB()
  }
})

describe.skip('sync', function() {
  it('auto starts', function() {})
  it('auto syncs', function() {})
  it('auto restarts', function() {})
  it('syncs in intervals', function() {})
  it('delays after an exception flood', function() {})
  it('supports a function based list definition', function() {})

  describe.skip('label filters', function() {})
})
