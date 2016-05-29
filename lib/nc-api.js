import Api from 'fetch-api'

export const NC_API_ROOT = 'http://localhost:8080/'

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
