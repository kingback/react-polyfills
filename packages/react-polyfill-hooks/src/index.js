import React from 'react';
import Engine from 'universal-polyfill-engine';
import {
  withHooks,
  useRef,
  useState,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  useImperativeHandle,
  useDebugValue
} from 'universal-polyfill-hooks';

Engine.set(React);

export {
  withHooks,
  useRef,
  useState,
  useContext,
  useReducer,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  useImperativeHandle,
  useDebugValue
};