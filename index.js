var assign = require('object-assign')

module.exports = function dekuMemoize (component) {
  if (typeof component !== 'object' || typeof component.render !== 'function') {
    throw new Error('deku-memoize: expected a component')
  }

  if (!component.shouldUpdate) return component

  var calls = {}

  function onRemove (model) {
    delete calls[model.path]
    component.onRemove(model)
  }

  return assign({}, component, {
    shouldUpdate: undefined,
    render: memoize(
      component.render,
      component.shouldUpdate,
      calls),
    onRemove: onRemove
  })
}

function memoize (func, shouldUpdate, calls) {
  return function (model) {
    if (!calls[model.path]) calls[model.path] = {}
    var cache = calls[model.path]
    if (cache.last && !shouldUpdate(model, cache.last)) return cache.result
    cache.result = func.call(this, model)
    cache.last = model
    return cache.result
  }
}
