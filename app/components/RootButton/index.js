/**
*
* RootButton
*
*/

import React from 'react';
// import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'react-router-redux';

import Content from './styles/Content';

class RootButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Content>
        <button onClick={this.props.pushToRoot}>Ingos Chain</button>
      </Content>
    );
  }
}

RootButton.propTypes = {

};


const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pushToRoot: (url) => dispatch(push('/')),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(RootButton);
