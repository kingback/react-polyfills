# `rax-polyfill-ref`

> Polyfill for Rax new ref api

## Support

`>= rax@0.6.5`

## Usage

```jsx
import { createRef, forwardRef } from 'rax-polyfill-ref';
const ref = createRef();

function App() {
  return (
    <div>
      <input ref={ref} />
      <button onClick={() => ref.current.focus()}>click</button>
    </div>
  );
}

// forwardRef

const ref = createRef();

const Input = forwardRef((props, ref) => {
  return <input ref={ref} />
});

const App = () => {
  return (
    <div>
      <Input ref={ref} />
      <button onClick={() => ref.current.focus()}>click</button>
    </div>
  );
};
```

For more usage, see <https://reactjs.org/docs/refs-and-the-dom.html#creating-refs>

## Others

You can use it with [rax-polyfill-context](https://www.npmjs.com/package/rax-polyfill-context) and [rax-polyfill-hooks](https://www.npmjs.com/package/rax-polyfill-hooks)

