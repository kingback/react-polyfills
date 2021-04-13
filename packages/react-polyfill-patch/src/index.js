import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as polyfills from 'react-polyfill-all';

const { withHooks, createPortal } = polyfills;
const createElement = React.createElement;

function isFunctionComponent(component) {
  return typeof component === 'function' && (!component.prototype || typeof component.prototype.render !== 'function');
}

function cloneFunctionComponent(component) {
  function CloneFunctionComponent() {
    if (!component.__with_hooks_component__) {
      try {
        return component.apply(this, arguments);
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