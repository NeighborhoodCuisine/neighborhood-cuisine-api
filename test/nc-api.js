import { expect } from 'chai'
import NCApi, { NC_API_ROOT } from '../lib/nc-api'

describe('NCApi', () => {
  let api = null
  beforeEach(() => {
    api = new NCApi()
  })

  it('should construct api with NC_API_ROOT', () => {
    expect(api.API_ROOT).to.equal(NC_API_ROOT)
    expect(api.options).to.deep.equal({})
  })
})
