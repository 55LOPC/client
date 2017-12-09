/**
 *
 * Index
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectIndex from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Index extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Index</title>
          <meta name="description" content="Description of Index" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
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
