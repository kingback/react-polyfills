# `rax-polyfill-hooks`

> Polyfill for Rax new hooks api

## Support

`>= rax@0.6.5`

## Usage

Just use `withHooks` to wrap your component, everything is just like the new Rax.

```jsx
import {
  withHooks,
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef
} from 'rax-polyfill-hooks';

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
* [useDebugValue](https://reactjs.org/docs/hooks-reference.html#usedebugvalue)(Just an empty function)

## Others

You can use it with [rax-polyfill-ref](https://www.npmjs.com/package/rax-polyfill-ref) and [rax-polyfill-context](https://www.npmjs.com/package/rax-polyfill-context)

