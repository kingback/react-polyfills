import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as polyfills from 'react-polyfill-all';

const { withHooks, createPortal } = polyfills;
const createElement = React.createElement;

function isFunctionComponent(component) {
  return typeof component === 'function' && (
    !component.prototype || (
      typeof component.prototype.render !== 'function' &&
      !component.prototype.isReactComponent
    )
  );
}

function cloneFunctionComponent(component) {
  function CloneFunctionComponent() {
    if (!component.__with_hooks_component__) {
      try {
        const ret = component.apply(this, arguments);
        // v0.14 don't support return null/undefined
        // @see https://github.com/facebook/react/issues/5355
        return ret == null && /^0\.14\./.test(React.version || '') ? React.createElement('noscript', {}) : ret;
      } catch (e) {
        if (/^\[HOOKS_POLYFILL_ERROR\]/.test(e.message)) {
          component.__with_hooks_component__ = withHooks(component);
        } else {
          throw e;
        }
      }
    }
    const WithHooksComponent = component.__with_hooks_component__;
    return WithHooksComponent ? new WithHooksComponent(...arguments) : null;
  };
  CloneFunctionComponent.displayName = component.displayName || component.name || 'CloneFunctionComponent';
  return CloneFunctionComponent;
}

if (!useState) {
  React.createElement = function(type, ...args) {
    if (isFunctionComponent(type)) {
      type = type.__renderFunction__ || (type.__renderFunction__ = cloneFunctionComponent(type));
    }
    return createElement.call(this, type, ...args);
  };
}

Object.keys(polyfills).forEach(p => {
  if (!React[p] && (p !== 'createPortal')) React[p] = polyfills[p];
});

if (!ReactDOM.createPortal) {
  ReactDOM.createPortal = createPortal;
}