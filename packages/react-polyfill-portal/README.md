# `react-polyfill-portal`

> Polyfill for React new portal api

## Support

`>= react@0.14.9`

## Usage

```jsx
import { createPortal } from 'react-polyfill-portal';

function Portal() {
  return createPortal(props.children, document.body);
}

function App() {
  return (
    <div>
      <Portal>
        <p>text</p>
      </Portal>
    </div>
  );
}
```

For more usage, see <https://reactjs.org/docs/portals.html>

