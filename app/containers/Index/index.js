/**
 *
 * Index
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'react-router-redux';


import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectIndex from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import Content from './styles/Content';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

export class Index extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  pushToVW = () => {
    this.props.pushTo('/vw');
  }

  pushToDealer = () => {
    this.props.pushTo('/dealer');
  }

  render() {
    return (
      <Content>
        <Grid>
          <Row>
            <Col><h1>Ingos Chain</h1></Col>
          </Row>
          <Row>
            <Col>
              <ul>
                <li><button onClick={this.pushToVW}>Volkswagen</button></li>
                <li><button onClick={this.pushToDealer}>Car dealer</button></li>
                <li><button>Agent</button></li>
                <li><button>Cient</button></li>
                <li><button>Insurance</button></li>
                <li><button>Policeman</button></li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  index: makeSelectIndex(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    pushTo: (url) => dispatch(push(url)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'index', reducer });
const withSaga = injectSaga({ key: 'index', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Index);
