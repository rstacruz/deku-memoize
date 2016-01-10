var assign = require('object-assign')

module.exports = function dekuMemoize (component) {
  if (typeof component !== 'object' || typeof component.render !== 'function') {
    throw new Error('deku-memoize: expected a component')
  }

  if (!component.shouldUpdate) return component

  return assign({}, component, {
    shouldUpdate: undefined,
    render: memoize(
      component.render,
      component.shouldUpdate)
  })
}

function memoize (func, shouldUpdate) {
  var calls = {}

  var memoize = function (model) {
    if (!calls[model.path]) calls[model.path] = {}
    var cache = calls[model.path]
    if (cache.last && !shouldUpdate(model, cache.last)) return cache.result
    cache.result = func.call(this, model)
    cache.last = model
    return cache.result
  }

  return memoize
}
