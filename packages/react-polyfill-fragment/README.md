# `react-polyfill-fragment`

> Polyfill for React new Fragment api

## Support

`>= react@0.14.9`

## Usage

```jsx
import Fragment from 'react-polyfill-fragment';

function List({ items }) {
  return (
    <Fragment>
      {items.map(item => <li>{item}</li>)}
    </Fragment>
  );
}

function App() {
  const items = [1, 2];
  return (
    <ul>
      <List items={items} />
    </ul>
  );
}
```

For more usage, see <https://reactjs.org/docs/fragments.html>

