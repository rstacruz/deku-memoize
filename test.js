var test = require('tape')
var memoize = require('./index')
var deepEqual = require('deep-equal')

test('memoize', function (t) {
  var calls = 0
  var component = memoize({
    render: function () { calls++ },
    shouldUpdate: function () { return false }
  })

  component.render({ props: 0 })
  t.equal(calls, 1, 'called at first')

  component.render({ props: 0 })
  t.equal(calls, 1, 'not called again')
  t.end()
})

test('memoize with objects', function (t) {
  var calls = 0
  var component = memoize({
    render: function () { calls++ },
    shouldUpdate: negate(deepEqual)
  })

  component.render({ props: { name: 'john' } })
  t.equal(calls, 1, 'called at first')

  component.render({ props: { name: 'sue' } })
  t.equal(calls, 2, 'called when props changed')

  component.render({ props: { name: 'sue' } })
  t.equal(calls, 2, 'not called when props havent changed')
  t.end()
})

function negate (fn) {
  return function () { return !fn.apply(this, arguments) }
}
