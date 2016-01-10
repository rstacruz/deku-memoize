var test = require('tape')
var memoize = require('./index')
var deepEqual = require('deep-equal')

test('memoize', function (t) {
  var calls = 0
  var component = memoize({
    render: function () { calls++ },
    shouldUpdate: function () { return false }
  })

  component.render({ props: 0, path: 1 })
  t.equal(calls, 1, 'called at first')

  component.render({ props: 0, path: 1 })
  t.equal(calls, 1, 'not called again')

  component.render({ props: 0, path: 2 })
  t.equal(calls, 2, 'called when path is different')
  t.end()
})

test('memoize with objects', function (t) {
  var calls = 0
  var component = memoize({
    render: function () { calls++ },
    shouldUpdate: negate(deepEqual)
  })

  component.render({ props: { name: 'john' }, path: 1 })
  t.equal(calls, 1, 'called at first')

  component.render({ props: { name: 'sue' }, path: 1 })
  t.equal(calls, 2, 'called when props changed')

  component.render({ props: { name: 'sue' }, path: 1 })
  t.equal(calls, 2, 'not called when props havent changed')

  component.render({ props: { name: 'sue' }, path: 2 })
  t.equal(calls, 3, 'called when path is different')
  t.end()
})

function negate (fn) {
  return function () { return !fn.apply(this, arguments) }
}

test('standard', require('tape-standard')())
