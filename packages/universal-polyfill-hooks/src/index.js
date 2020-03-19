import Engine from 'universal-polyfill-engine';
import Dispatcher from './dispatcher';
import { useFallbackRef, createForwardRef } from 'universal-polyfill-ref';
const hooks = {};

/* eslint-disable max-len, prefer-spread */

function useHook(hook) {
  // lazy initial
  const hookFunc = function(...oArgs) {
    if (!hooks[hook]) {
      hooks[hook] = Engine.get()[hook] ? Engine.get()[hook] : (...args) => {
        if (Dispatcher.current) {
          return Dispatcher.current[hook].apply(Dispatcher.current, args);
        } else {
          throw new Error(`You can not use "${hook}" outside of the function.`);
        }
      };
    }
    return hooks[hook](...oArgs);
  };
  hookFunc.displayName = hook;
  return hookFunc;
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
export function useDebugValue() {}; // empty function

function createWithHooksComponent(render) {
  const isRax = !!Engine.get().render;
  return class WithHooksComponent extends Engine.get().Component {
    static __with_hooks__ = true;
    static displayName = render.displayName || render.name || 'WithHooksComponent';

    constructor(props) {
      super(props);
      this.pendingTimer = null;
      this.state = { update: 0 };
      this.dispatcher = new Dispatcher(() => {
        if (isRax) {
          if (!this.pendingTimer) {
            this.pendingTimer = Promise.resolve(0).then(() => {
              this.pendingTimer = null;
              this.update();
            });
          }
        } else {
          this.update();
        }
      });
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

    update() {
      this.setState({ update: this.state.update + 1 }); // force update
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
  // >= 16.3 && <= 16.8
  // has createRef/forwardRef but do not support hooks
  const _useState = Engine.get().useState;
  !_useState && useFallbackRef();
  return _useState ? render : createWithHooksComponent(render);
}
