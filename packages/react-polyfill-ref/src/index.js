import React, { Component } from 'react';

function getRef(component) {
  return component._reactInternalInstance &&
    component._reactInternalInstance._currentElement &&
    component._reactInternalInstance._currentElement.ref;
}

export function createForwardRef(component) {
  const ref = getRef(component);
  if (ref || !component.forwardRef) {  // for useRef
    ref.forward = component.forwardRef = inst => (ref.forward.current = (ref.current = inst));
    ref.forward.current = null;
  }
  return component.forwardRef || null;
}

export function createRef() {
  if (React.createRef) {
    return React.createRef();
  } else {
    const ref = inst => (!ref.forward && (ref.current = inst));  // for useRef
    ref.current = null;
    return ref;
  }
}

function createForwardRefComponent(render) {
  return class ForwardRefComponent extends Component {
    render() {
      return render(this.props, createForwardRef(this));
    }
  };
}

export function forwardRef(render) {
  if (React.forwardRef) {
    return React.forwardRef(render);
  } else if (render.__with_hooks__) {
    render.__need_forward_ref__ = true; // for useRef
    return render;
  } else {
    // TODO
    // need test
    // 0.14.9 15.6.2 16.2.0 16.8.0
    return createForwardRefComponent(render);
  }
}