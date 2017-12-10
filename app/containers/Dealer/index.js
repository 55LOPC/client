/**
 *
 * Dealer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDealer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getVehicleDataSubmit,
  updateTextField,
  addErrorSubmit,
  fixError,
  fixErrorSubmit,
} from './actions';

import RootButton from 'components/RootButton';

import Content from './styles/Content';
import { Grid, Row, Col, Alert, Form, FormGroup, FormControl, Button, Panel, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

export class Dealer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  getVehicleData = () => {
    this.props.getVehicleDataSubmit();
  }

  addError = () => {
    this.props.addErrorSubmit();
  }

  fixError = (event) => {
    this.props.fixError(event.target.dataset.errortx);
  }

  fixErrorSubmit = () => {
    this.props.fixErrorSubmit();
  }

  updateTextField = (event) => {
    this.props.updateTextField(event.target.name, event.target.value);
  }

  render() {

    const activeErrors = this.props.dealer.errors.active === false ? null : (
      this.props.dealer.errors.active.map((item, index) => {
        return (
          <ListGroupItem header={`Error code: ${item.errorCode}`} key={`active_error_code_${index}`} bsStyle="danger">
            <a href={`https://wavesexplorer.com/tx/${item.tx}`} target="_blank">{item.tx}</a> <button onClick={this.fixError} data-errorTx={item.tx}>Fix</button>
          </ListGroupItem>
        )
      })
    );

    const fixedErrors = this.props.dealer.errors.fixed === false ? null : (
      this.props.dealer.errors.fixed.map((item, index) => {
        return (
          <ListGroupItem header={`Error code: ${item.errorCode}`} key={`active_error_code_${index}`} bsStyle="success">
            <a href={`https://wavesexplorer.com/tx/${item.tx}`} target="_blank">{item.tx}</a>
          </ListGroupItem>
        )
      })
    );

    return (
      <Content>
        <Grid>
          <Row>
            <Col lg={8}><RootButton /></Col>
          </Row>
          <Row>
            <Col lg={8}>
              <h1>Car dealer</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              {
                this.props.dealer.vehicleData === false ? (
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Enter VIN code"
                      name="vinCode"
                      value={this.props.dealer.vinCode}
                      onChange={this.updateTextField}
                    />
                    <Button
                      bsStyle="success"
                      onClick={this.getVehicleData}
                      disabled={this.props.dealer.requestingData || this.props.dealer.vinCode === ''}
                    >
                      {this.props.dealer.requestingData === true ? 'Loading...' : 'Request data'}
                    </Button>
                  </Form>
                ) : null
              }
            </Col>
          </Row>
          <Row >
            <Col lg={8}>
              {
                this.props.dealer.vehicleData === false ? null : (
                  <div>
                    <Panel header="Vehicle address">
                      <a href={`https://wavesexplorer.com/address/${this.props.dealer.vehicleData.address}`} target="_blank">
                        {this.props.dealer.vehicleData.address}
                      </a>
                    </Panel>

                    <h2>Active errors</h2>
                    {
                      activeErrors === null ? (
                        <Alert bsStyle="success">No errors so far</Alert>
                      ) : <ListGroup>{activeErrors}</ListGroup>
                    }

                    {
                      this.props.dealer.errorTx === false ? (
                        <Form inline>
                          <FormControl
                            type="text"
                            placeholder="Enter error code"
                            name="errorCode"
                            value={this.props.dealer.errorCode}
                            onChange={this.updateTextField}
                          />
                          <Button
                            bsStyle="success"
                            onClick={this.addError}
                            disabled={this.props.dealer.addingError || this.props.dealer.vinCode === ''}
                          >
                            {this.props.dealer.addingError === true ? 'Loading...' : 'Add error'}
                          </Button>
                        </Form>
                      ) : (
                        <Form inline>
                          <FormControl
                            type="text"
                            placeholder="Error Tx"
                            name="errorTx"
                            value={this.props.dealer.errorTx}
                            readOnly={Boolean(true)}
                          />
                          <Button
                            bsStyle="success"
                            onClick={this.fixErrorSubmit}
                            disabled={this.props.dealer.fixingError || this.props.dealer.errorTx === ''}
                          >
                            {this.props.dealer.fixingError === true ? 'Loading...' : 'Fix error'}
                          </Button>
                        </Form>
                      )
                    }

                    <h2>Fixed errors</h2>
                    {
                      fixedErrors === null ? (
                        <Alert bsStyle="success">No errors so far</Alert>
                      ) : <ListGroup>{fixedErrors}</ListGroup>
                    }
                  </div>
                )
              }
            </Col>
          </Row>
        </Grid>
      </Content>
    );
  }
}

Dealer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dealer: makeSelectDealer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVehicleDataSubmit: () => dispatch(getVehicleDataSubmit()),
    addErrorSubmit: () => dispatch(addErrorSubmit()),
    fixError: (errorTx) => dispatch(fixError(errorTx)),
    fixErrorSubmit: () => dispatch(fixErrorSubmit()),
    updateTextField: (fieldName, fieldValue) => dispatch(updateTextField(fieldName, fieldValue)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dealer', reducer });
const withSaga = injectSaga({ key: 'dealer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dealer);
