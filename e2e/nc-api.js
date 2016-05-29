import { expect } from 'chai'
import NCApi from '../lib/nc-api'

describe('E2E Neighborhood Cuisine Api', () => {
  let api = null
  beforeEach(() => {
    api = new NCApi()
  })

  it('should connect to server', (done) => {
    // this should run without errors
    // which means, the server exists
    api.fetch('/', { method: 'headers' })
      .then(() => { done() })
      .catch((e) => {
        if (e.message.match(/Response has no ok-status/)) {
          done()
        } else {
          done(e)
        }
      })
  })

  it('should retrieve recipe by id', (done) => {
    api.getRecipeCard(42)
      .then(({ data }) => {
        expect(data.summary).to.be.instanceOf('string')
        expect(data.extendedIngredients).to.be.instanceOf('object')
        done()
      })
      .catch(e => {
        done(e)
      })
  })
})
