import { rAF, isFunction, isDepsChanged, objectIs } from './utils';
import { MEMO, EFFECT, LAYOUT_EFFECT } from './types';
import { createRef } from 'universal-polyfill-ref';

/* eslint-disable no-plusplus, no-param-reassign */

export default class Dispatcher {
  static previous = null;

  static current = null;

  constructor(onUpdate) {
    this.index = 0;
    this.state = [];
    this.onUpdate = onUpdate;
  }

  reset() {
    this.index = 0;
  }

  update(unmount) {
    this.runEffects(LAYOUT_EFFECT, unmount);
    unmount ?
      this.runEffects(EFFECT, unmount) :
      rAF(() => this.runEffects(EFFECT));
  }

  unmount() {
    this.update(true);
    this.state = [];
    this.index = 0;
    this.onUpdate = null;
  }

  initState(initial, useFunc = false) {
    const { state, index, onUpdate } = this;
    return (state[index] = {
      value: isFunction(initial) ? initial() : initial, // lazy init
      setter: useFunc ? null : (value) => {
        const prevValue = state[index].value;
        // get prevValue
        if (isFunction(value)) value = value(prevValue);
        if (!objectIs(value, prevValue)) {
          state[index].value = value;
          onUpdate && onUpdate(index, value);
        }
      }
    });
  }

  useState(initial, useFunc) {
    const state = this.state[this.index] || this.initState(initial, useFunc);
    this.index++;
    return [state.value, state.setter];
  }

  useReducer(reducer, initState, init) {
    const [redux] = this.useState(() => {
      const { state, index } = this; // cache index
      return {
        reducer,
        state: isFunction(init) ? init(initState) : initState, // modify initial state
        dispatch: (action) => { // never update
          const { value, setter } = state[index];
          const newState = reducer(value.state, action);
          !objectIs(value.state, newState) && setter({ ...value, state: newState });
        }
      };
    });
    return [redux.state, redux.dispatch];
  }

  useFunc(callback, deps, type) {
    const [func] = this.useState({ callback, deps, type, run: true }, true);
    const isMemo = func.type === MEMO;
    if (func.run || isDepsChanged(func.deps, deps)) {
      func.run = !isMemo;
      func.deps = deps;
      func.callback = callback;
      isMemo && (func.value = func.callback());
    }
    return func.value;
  }

  useEffect(callback, deps) {
    this.useFunc(callback, deps, EFFECT);
  }

  useLayoutEffect(callback, deps) {
    this.useFunc(callback, deps, LAYOUT_EFFECT);
  }

  useMemo(callback, deps) {
    return this.useFunc(callback, deps, MEMO);
  }

  useCallback(callback, deps) {
    return this.useMemo(() => callback, deps);
  }

  useRef(current) {
    return this.useState(() => {
      if (isFunction(current) && ('current' in current)) {
        return current;
      } else {
        return createRef(current);
      }
    })[0];
  }

  useImperativeHandle(ref, createHandle, deps) {
    return this.useMemo(() => {
      if (isFunction(ref)) {
        ref(createHandle());
      } else if (ref) {
        ref.current = createHandle();
      } 
    }, deps);
  }

  useContext(context) {
    return this.useState(context)[0]._currentValue;
  }

  runEffects(type, unmount) {
    const effects = this.state.filter(state => (
      state &&
      state.value &&
      (unmount || state.value.run) &&
      state.value.callback &&
      state.value.type === type
    ));

    // unmount
    effects.forEach((effect) => {
      (unmount || effect.value.run) &&
      effect.value.unmount && effect.value.unmount();
    });

    // mount || update
    !unmount && effects.forEach((effect) => {
      if (effect.value.run) {
        effect.value.run = false;
        effect.value.unmount = effect.value.callback();
      }
    });
  }
}
