# `rax-polyfill-context`

> Polyfill for Rax new context api

## Support

`>= rax@0.6.5`

## Usage

```jsx
import { render } from 'rax';
import { createContext } from 'rax-polyfill-context';
const Context = createContext();

function App() {
  return (
    <div>
      <Context.Consumer>{(value) => (
        <p>{value}</p>
      )}</Context.Consumer>
    </div>
  );
}

render((
  <Context.Provider value={0}>
    <App />
  </Context.Provider>
), document)
```

For more usage, see <https://reactjs.org/docs/context.html#reactcreatecontext>

## Others

You can use it with [rax-polyfill-ref](https://www.npmjs.com/package/rax-polyfill-ref) and [rax-polyfill-hooks](https://www.npmjs.com/package/rax-polyfill-hooks)

