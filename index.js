var assign = require('object-assign')

module.exports = function dekuMemoize (component) {
  if (typeof component !== 'object' || typeof component.render !== 'function') {
    throw new Error('deku-memoize: expected a component')
  }

  return assign({}, component, {
    render: memoize(
      component.render,
      component.shouldUpdate || defaultUpdate)
  })
}

function memoize (func, compare) {
  var last, result

  var memoize = function (model) {
    if (last && compare(model, last)) return result 
    result = func.call(this, model)
    last = model
    return result
  }

  return memoize
}

function defaultUpdate (model, other) {
  return model.props === other.props &&
    model.context === other.context
}
