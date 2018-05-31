import React, { Component } from 'react';
import { connect } from 'react-redux';
import { verifyAuth } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

import '../../styles/global.scss';

class App extends Component {
  componentDidMount() {
    this.props.verifyAuth();
  }
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default withRouter(connect(null, { verifyAuth })(App));
