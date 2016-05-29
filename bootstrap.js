//
// Bootstrap Test Environment
// This file has to be written in plain ES5!
//

//
// Enable ES6
//

// node_modules written in es6 which have to be compiled as well.
// Add packges names here.
var ES6_PACKAGES = [
  'fetch-api',
  'fetch-mock'
]
require('babel-core/register')({
  // ignore 3rd party packages
  // but build those which are written in es6 purely
  ignore: new RegExp('/(?!node_modules\/(' + ES6_PACKAGES.join('|') + '))node_modules/')
})

function polyfillBluebird() {
  var local = null
  var Promise = require('bluebird')

  // configuration
  Promise.config({
    longStrackTraces: true,
    warnings: true
  })

  if (typeof global !== 'undefined') {
    local = global
  } else if (typeof self !== 'undefined') {
    local = self
  } else {
    try {
      local = Function('return this')()
    } catch (e) {
      throw new Error(
        'Bluebird polyfill failed because global object' +
        ' is unavailable in this environment'
      )
    }
  }

  local.Promise = Promise
}

//
// Execute Polyfills
//

require('babel-polyfill')
polyfillBluebird()
require('isomorphic-fetch')
