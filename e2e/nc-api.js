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
        expect(data.summary).to.be.a.string
        expect(data.extendedIngredients).to.be.an.array
        expect(data.extendedIngredients).to.have.a.lengthOf(10)

        const i = data.extendedIngredients[0]
        expect(i).to.have.property('amount')
        expect(i).to.have.property('name')
        expect(i).to.have.property('unit')
        expect(i).to.have.property('unitLong')
        done()
      })
      .catch(done)
  })

  it('should retrieve recipes from ingredients', (done) => {
    const ingredients = ['honey', 'beef']
    api.getRecipesFromIngredients(ingredients)
      .then(({ data }) => {
        expect(data).to.have.length.of.at.least(1)
        expect(data[0]).to.have.property('image_url')
        expect(data[0]).to.have.property('ingredients')
        expect(data[0]).to.have.property('missing_ingredients')
        expect(data[0]).to.have.property('recipe_id')
        expect(data[0]).to.have.property('title')
        expect(data[0].ingredients).to.be.an.array
        expect(data[0].ingredients[0]).to.have.property('name')
        expect(data[0].ingredients[0]).to.have.property('aisle')
        expect(data[0].ingredients[0]).to.have.property('image')
        done()
      })
      .catch(done)
  })
})
