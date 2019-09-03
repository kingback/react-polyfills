import React, { Children, Component } from 'react';
const PropTypes = { any: () => {} };

function createContextProvider(Context) {
  return class ContextProvider extends Component {
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
      return Children.only(this.props.children);
    }
  };
}

function createContextConsumer(defaultValue, Context) {
  return class ContextConsumer extends Component {
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
  if (React.createContext) return React.createContext(defaultValue);
  const Context = { _currentValue: defaultValue }; // for useContext
  Context.Provider = createContextProvider(Context);
  Context.Consumer = createContextConsumer(defaultValue, Context);
  return Context;
}