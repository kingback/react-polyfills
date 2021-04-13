import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

const PureComponent = React.PureComponent || class extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
};

export default PureComponent;
