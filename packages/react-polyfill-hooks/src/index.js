import Dispatcher from './dispatcher';
import React, { Component } from 'react';
import { useFallbackRef, createForwardRef } from 'react-polyfill-ref';

/* eslint-disable max-len, prefer-spread */

// >= 16.3 && <= 16.8
// has createRef/forwardRef but do not support hooks
!React.useState && useFallbackRef();

function useHook(hook) {
  return React[hook] ? React[hook] : (...args) => {
    if (Dispatcher.current) {
      return Dispatcher.current[hook].apply(Dispatcher.current, args);
    } else {
      throw new Error(`You can not use "${hook}" outside of the function.`);
    }
  };
}

export const useState = useHook('useState');
export const useReducer = useHook('useReducer');
export const useContext = useHook('useContext');
export const useMemo = useHook('useMemo');
export const useCallback = useHook('useCallback');
export const useEffect = useHook('useEffect');
export const useLayoutEffect = useHook('useLayoutEffect');
export const useRef = useHook('useRef');
export const useImperativeHandle = useHook('useImperativeHandle');

function createWithHooksComponent(render) {
  return class WithHooksComponent extends Component {
    static __with_hooks__ = true;

    constructor(props) {
      super(props);
      this.state = { update: 0 };
      this.dispatcher = new Dispatcher(() => this.setState({ update: this.state.update + 1 })); // force update
    }

    componentDidMount() {
      this.dispatcher.update();
    }

    componentDidUpdate() {
      this.dispatcher.update();
    }

    componentWillUnmount() {
      this.dispatcher.unmount();
    }

    render() {
      let view = null;
      Dispatcher.previous = Dispatcher.current;
      Dispatcher.current = this.dispatcher;
      Dispatcher.current.reset();
      const needForwardRef = this.constructor.__need_forward_ref__;
      view = render(this.props, needForwardRef && createForwardRef(this));
      Dispatcher.current.reset();
      Dispatcher.current = Dispatcher.previous;
      return view;
    }
  };
}

export function withHooks(render) {
  return React.useState ? render : createWithHooksComponent(render);
}
