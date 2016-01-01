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
  var last, result

  var memoize = function (model) {
    if (last && !shouldUpdate(model, last)) return result 
    result = func.call(this, model)
    last = model
    return result
  }

  return memoize
}
