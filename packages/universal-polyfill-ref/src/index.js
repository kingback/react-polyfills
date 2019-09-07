import Engine from 'universal-polyfill-engine';
let supportNewRef = true;

export function useFallbackRef() {
  supportNewRef = false;
}

export function getRef(component) {
  return ( // > 16.x 
    component._reactInternalFiber &&
    component._reactInternalFiber.ref
  ) || ( // < 16.x
    component._reactInternalInstance &&
    component._reactInternalInstance._currentElement &&
    component._reactInternalInstance._currentElement.ref
  ) || ( // < Rax
    component._internal &&
    component._internal._currentElement &&
    component._internal._currentElement.ref
  );
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
  if (supportNewRef && Engine.get().createRef) {
    return Engine.get().createRef();
  } else {
    const ref = inst => (!ref.forward && (ref.current = inst));  // for useRef
    ref.current = null;
    return ref;
  }
}

function createForwardRefComponent(render) {
  return class ForwardRefComponent extends Engine.get().Component {
    render() {
      return render(this.props, createForwardRef(this));
    }
  };
}

export function forwardRef(render) {
  if (render.__with_hooks__) {
    render.__need_forward_ref__ = true; // for useRef
    return render;
  } else if (supportNewRef && Engine.get().forwardRef) {
    return Engine.get().forwardRef(render);
  } else {
    return createForwardRefComponent(render);
  }
}