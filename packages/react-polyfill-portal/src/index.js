import React from 'react';
import ReactDOM from 'react-dom';

class Portal extends React.Component {
  
  static defaultProps = {
    target: document.body,
    alwaysAppend: false
  };

  constructor(props) {
    super(props);
    const {
      className
    } = this.props;

    this.wrapper = document.createElement('div');
    if (className) {
      this.wrapper.className = className;
    }
  }

  componentDidMount() {
    this.mountChild(this.props.target);
    this.updateChild();
  }

  componentWillReceiveProps(nextProps) {
    const {
      alwaysAppend
    } = nextProps;

    if (alwaysAppend || (this.targetNode && nextProps.target !== this.props.target)) {
      this.unmountChild();
      this.mountChild(nextProps.target);
    }
  }

  componentDidUpdate() {
    this.updateChild();
  }

  componentWillUnmount() {
    this.unmountChild();
  }

  mountChild(target) {
    this.targetNode = ReactDOM.findDOMNode(target);
    this.wrapperNode = this.targetNode.appendChild(this.wrapper);
  }

  updateChild() {
    let { children } = this.props;
    const childrenCount = React.Children.count(children);
    if (childrenCount < 1) {
      return;
    }
    if (childrenCount > 1) {
      children = <div>{children}</div>;
    }
    ReactDOM.unstable_renderSubtreeIntoContainer(this, children, this.wrapperNode);
  }

  unmountChild() {
    if (this.targetNode) {
      ReactDOM.unmountComponentAtNode(this.wrapper);
      this.targetNode.removeChild(this.wrapper);
      this.targetNode = null;
    }
  }

  render() {
    return null;
  }
}

export const createPortal = ReactDOM.createPortal || function createPortal(children, container) {
  return <Portal target={container}>{children}</Portal>;
}