# `rax-polyfill-memo`

> Polyfill for Rax new memo api

## Support

`>= rax@0.6.5`

## Usage

```jsx
import memo from 'rax-polyfill-memo';
import Text from 'rax-text';

const MyComponent = memo((props) => {
  return <Text>{props.text}</Text>
});
```

For more usage, see <https://reactjs.org/docs/react-api.html#reactmemo>
