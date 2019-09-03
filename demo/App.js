import React from 'react';
import { forwardRef } from 'react-polyfill-ref';
import { createContext } from 'react-polyfill-context';
import { withHooks, useState, useContext, useEffect, useLayoutEffect, useReducer, useCallback, useImperativeHandle, useRef } from 'react-polyfill-hooks';

const Context = createContext(0);
const Forward = forwardRef((props, ref) => <div ref={ref}>Forward: {props.text}</div>);

const Child = forwardRef(withHooks(({ onAdd, onMinus }, ref) => {
  const inputRef = useRef();
  const value = useContext(Context);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    }
  }));

  useLayoutEffect(() => {
    console.log('child layout');
    return () => {
      console.log('child layout unmount');
    };
  }, [value <= 5]);

  useEffect(() => {
    console.log('child effect');
    return () => {
      console.log('child unmount');
    };
  }, []);

  return (
    <div>
      <p>Child: {value}</p>
      <p onClick={onAdd}>+</p>
      <p onClick={onMinus}>-</p>
      <input ref={inputRef} defaultValue="输入" />
    </div>
  );
}));

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

const App = withHooks(() => {
  const ref = useRef();
  const fRef = useRef();
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  const add = useCallback(() => dispatch({ type: 'add' }), []);
  const minus = useCallback(() => dispatch({ type: 'minus' }), []);
  const focus = useCallback(() => ref.current.focus(), [ref.current]);

  useLayoutEffect(() => {
    console.log('app layout');
  });

  useEffect(() => {
    console.log('app effect');
    console.log(ref.current);
    console.log(fRef.current);
  });

  return (
    <div>
      {state.count >= 0 ? <Forward ref={fRef} text={state.count} /> : null}
      <p>App: {state.count}</p>
      <Context.Provider value={state.count}>
        {state.count >= -5 ? <Child ref={ref} onAdd={add} onMinus={minus} /> : null}
      </Context.Provider>
      <p onClick={focus}>focus</p>
    </div>
  );
});

export default App;