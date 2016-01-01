# deku-memoize

Higher-order component to allow components to have a `shouldUpdate` method.

```
function render ({ props }) {
  return <button>{ props.label }</button>
}

// `model` is the parameter passed onto `render()`.
// `last` is the last saved value of model since the last hot `render()`.
function shouldUpdate (model, last) {
  return model.props.label === last.props.label
}

module.exports = dekuMemoize({ render, shouldUpdate })
```
