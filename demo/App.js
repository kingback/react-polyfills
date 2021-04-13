import 'react-polyfill-patch';
import React, {
  createRef,
  forwardRef,
  createContext,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useCallback,
  useImperativeHandle,
  useRef
} from 'react';

const Context = createContext(0);
const Forward = forwardRef((props, ref) => <div ref={ref}>Forward: {props.text}</div>);

const Child = forwardRef(({ onAdd, onMinus }, ref) => {
  const inputRef = useRef(createRef());
  const value = useContext(Context);
  const [state] = useState(0);

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
    console.log(state);
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
});

const Memo = React.memo(({ text }) => {
  return <div>memo: {text}</div>
});

const Pure = class extends React.PureComponent {
  render() {
    return <div>pure: {this.props.text}</div>
  }
};

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

function App() {
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
      <Memo text={0} />
      <Pure text={state.count} />
    </div>
  );
};

export default App;