# deku-memoize

Decorator to allow components to have a `shouldUpdate` method. For use with [deku] v2 or [decca].

[![Status](https://travis-ci.org/rstacruz/deku-memoize.svg?branch=master)](https://travis-ci.org/rstacruz/deku-memoize "See test builds")

## Usage

`dekuMemoize(component)` takes in a deku Component, and returns another Component (a [decorator]). It will use the component's `shouldUpdate` funtion to check if there are updates to be done.

```js
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

## shouldUpdate

`shouldUpdate` takes 2 arguments; both are the first parameters passed onto `render()`. If it returns `true`, then a render will be triggered; otherwise, `render()` will not be called.

`shouldUpdate` will not be called on the first render.

If shouldUpdate is not given, it will always re-render no matter what (default deku behavior).

[deku]: http://dekujs.github.io/deku/
[decca]: http://ricostacruz.com/decca
[decorator]: https://en.wikipedia.org/wiki/Decorator_pattern

## Thanks

**deku-memoize** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/deku-memoize/contributors

[![](https://img.shields.io/badge/%E2%9C%93-collaborative_etiquette-brightgreen.svg)](http://git.io/col)
