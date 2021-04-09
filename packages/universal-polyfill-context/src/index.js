import Engine from 'universal-polyfill-engine';
const PropTypes = { any: () => {} };
let supportNewContext = true;

export function useFallbackContext() {
  supportNewContext = false;
}

function createContextProvider(Context) {
  return class ContextProvider extends Engine.get().Component {
    static childContextTypes = {
      value: PropTypes.any,
      provider: PropTypes.any
    };

    static propTypes = {
      value: PropTypes.any
    };

    getChildContext() {
      const { value } = this.props;
      Context._currentValue = value; // for useContext
      return {
        value,
        provider: this.constructor
      };
    }

    render() {
      return Engine.get().Children.only(this.props.children);
    }
  };
}

function createContextConsumer(defaultValue, Context) {
  return class ContextConsumer extends Engine.get().Component {
    static contextTypes = {
      value: PropTypes.any,
      provider: PropTypes.any
    };

    render() {
      const { children } = this.props;
      return typeof children === 'function' ? children(this.context && (this.context.provider === Context.Provider) ? this.context.value : defaultValue) : null;
    }
  };
}

// TODO
// contextType
export function createContext(defaultValue) {
  if (Engine.get().createContext && Engine.get().createContext !== createContext && supportNewContext) return Engine.get().createContext(defaultValue);
  const Context = { _currentValue: defaultValue }; // for useContext
  Context.Provider = createContextProvider(Context);
  Context.Consumer = createContextConsumer(defaultValue, Context);
  return Context;
}