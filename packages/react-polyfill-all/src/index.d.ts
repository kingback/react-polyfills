import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const memo: typeof React.memo;
export const createRef: typeof React.createRef;
export const forwardRef: typeof React.forwardRef;
export const createContext: typeof React.createContext;
export const PureComponent: typeof React.PureComponent;

export const createPortal: typeof ReactDOM.createPortal;

export const withHooks: (render: React.FC) => React.Component;
export const useRef: typeof React.useRef;
export const useState: typeof React.useState;
export const useContext: typeof React.useContext;
export const useReducer: typeof React.useReducer;
export const useEffect: typeof React.useEffect;
export const useLayoutEffect: typeof React.useLayoutEffect;
export const useMemo: typeof React.useMemo;
export const useCallback: typeof React.useCallback;
export const useImperativeHandle: typeof React.useImperativeHandle;
export const useDebugValue: typeof React.useDebugValue;