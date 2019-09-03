# `react-polyfill-ref`

> Polyfill for React new ref api

## Support

`>= React@0.14.9`

## Usage

```jsx
import { createRef, forwardRef } from 'react-polyfill-ref';
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

You can use it with [react-polyfill-context](https://www.npmjs.com/package/react-polyfill-context) and [react-polyfill-hooks](https://www.npmjs.com/package/react-polyfill-hooks)

