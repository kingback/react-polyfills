# react-polyfills

> React/Rax polyfills for ref, context and hooks

## usage

### React

> version < v16.3

```js
import {
  // memo
  memo,
  // ref
  createRef,
  forwardRef,
  // Fragment
  Fragment,
  // PureComponent
  PureComponent,
  // portal
  createPortal,
  // context
  createContext,
  // hooks
  withHooks,
  useRef,
  useState,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'react-polyfill-all';
```

#### use react patch

```js
import 'react-polyfill-patch';
import {
  // memo
  memo,
  // ref
  createRef,
  forwardRef,
  // Fragment
  Fragment,
  // PureComponent
  PureComponent,
  // context
  createContext,
  // hooks
  useRef,
  useState,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'react';
import { createPortal } from 'react-dom';
```

### Rax

> version <= 0.6.7

```js
import {
  // memo
  memo,
  // ref
  createRef,
  forwardRef,
  // context
  createContext,
  // hooks
  withHooks,
  useRef,
  useState,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  useImperativeHandle
} from 'rax-polyfill-all';
```

### More information

* [react-polyfill-all](https://www.npmjs.com/package/react-polyfill-all)
* [react-polyfill-patch](https://www.npmjs.com/package/react-polyfill-patch)
* [rax-polyfill-all](https://www.npmjs.com/package/rax-polyfill-all)