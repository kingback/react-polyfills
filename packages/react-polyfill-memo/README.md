# `react-polyfill-memo`

> Polyfill for React new memo api

## Support

`>= react@0.14.9`

## Usage

```jsx
import memo from 'react-polyfill-memo';

const MyComponent = memo((props) => {
  return <div>{props.text}</div>
});
```

For more usage, see <https://reactjs.org/docs/react-api.html#reactmemo>

