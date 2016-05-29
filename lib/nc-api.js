import Api from 'fetch-api'

export const NC_API_ROOT = process.env.NEIGHBORHOOD_CUISINE_API || 'http://localhost:8080/'
if (!process.env.NEIGHBORHOOD_CUISINE_API) {
  console.warn('process.env.NEIGHBORHOOD_CUISINE_API is not defined.'
               + ` Accessing local server on ${NC_API_ROOT}`)
}

export default class NeighborhoodCuisineApi extends Api {
  constructor(apiUrl = null, options = {}) {
    // make apiUrl an optional parameter
    if (typeof apiUrl === 'object' && apiUrl !== null) {
      options = apiUrl
      apiUrl = null
    }

    // inject neighborhood cuisine url by default
    if (apiUrl === null) {
      apiUrl = NC_API_ROOT
    }

    super(apiUrl, options)
  }

  //
  // ##Handlers
  //

  getRecipeCard(recipeId) {
    return this.postJSON('/recipe-card', {
      recipe_id: recipeId
    })
  }
}
