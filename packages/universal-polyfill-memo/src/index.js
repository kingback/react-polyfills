import Engine from 'universal-polyfill-engine';
import shallowCompare from 'react-addons-shallow-compare';

function shallowEqual(props, nextProps) {
  return !shallowCompare({ props }, nextProps);
}

export default function memo(Component, compare) {
  const engine = Engine.get();
  if (engine.memo && engine.memo !== memo) return engine.memo(Component, compare);
  class MemoComponent extends engine.Component {
    shouldComponentUpdate(nextProps) {
      const isEqual = typeof compare === 'function' ? compare : shallowEqual;
      return !isEqual(this.props, nextProps);
    }

    render() {
      return engine.createElement(Component, this.props, this.props.children);
    }
  };
  MemoComponent.displayName = Component.displayName || Component.name || 'MemoComponent';
  return MemoComponent;
}