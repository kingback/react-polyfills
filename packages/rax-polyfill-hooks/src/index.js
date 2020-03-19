import * as Rax from 'rax';
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

Engine.set(Rax);

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