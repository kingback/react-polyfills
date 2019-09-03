# `react-polyfill-hooks`

> Polyfill for React new hooks api

## Support

`>= React@0.14.9`

## Usage

Just use `withHooks` to wrap your component, everything is just like the new React.

```jsx
import { withHooks, useState, useEffect, useReducer, useCallback } from 'react-polyfill-hooks';

const App = withHooks((props) => {
  const [count, setCount] = useState(props.count || 0);
  const inputRef = useRef();

  useEffect(() => {
    console.log(count);
  });

  useEffect(() => {
    inputRef.current.focus();
    return () => {
      inputRef.current.blur();
    };
  }, []);

  return (
    <div>
      <p>{count}</p>
      <input ref={inputRef} />
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
});

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1 };
    case 'minus':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const ReduxApp = withHooks((props) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const add = useCallback(() => dispatch({ type: 'add' }), []);
  const minus = useCallback(() => dispatch({ type: 'minus' }), []);

  return (
    <div>
      <p>{state.count}</p>
      <button onClick={add}>+</button>
      <button onClick={minus}>-</button>
    </div>
  );
});
```

For more usage, see <https://reactjs.org/docs/hooks-reference.html>

* [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
* [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
* [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext)
* [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
* [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
* [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
* [useRef](https://reactjs.org/docs/hooks-reference.html#useref)
* [useImperativeHandle](https://reactjs.org/docs/hooks-reference.html#useimperativehandle)
* [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)

## Others

You can use it with [react-polyfill-ref](https://www.npmjs.com/package/react-polyfill-ref) and [react-polyfill-context](https://www.npmjs.com/package/react-polyfill-context)

