# `react-polyfill-context`

> Polyfill for React new context api

## Support

`>= React@0.14.9`

## Usage

```jsx
import React from 'react';
import { render } from 'react-dom';
import { createContext } from 'react-polyfill-context';
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

You can use it with [react-polyfill-ref](https://www.npmjs.com/package/react-polyfill-ref) and [react-polyfill-hooks](https://www.npmjs.com/package/react-polyfill-hooks)

