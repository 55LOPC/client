/**
 *
 * Agent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAgent from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getVehicleDataSubmit,
  addPolicySubmit,
  addDriverSubmit,
  updateTextField,
} from './actions';

import RootButton from 'components/RootButton';

import Content from './styles/Content';
import { Grid, Row, Col, Alert, Form, FormGroup, FormControl, Button, Panel, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

export class Agent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  getVehicleData = () => {
    this.props.getVehicleDataSubmit();
  }

  addPolicy = () => {
    this.props.addPolicySubmit();
  }

  addDriver = () => {
    this.props.addDriverSubmit();
  }

  updateTextField = (event) => {
    this.props.updateTextField(event.target.name, event.target.value);
  }

  render() {

    const drivers = this.props.agent.drivers.list === false ? null : (
      this.props.agent.drivers.list.map((item, index) => {
        const address = (
          <span style={{ fontSize: 18 }}>
            Driver address:  <a href={`https://wavesexplorer.com/tx/${item.address}`} target="_blank">{item.address}</a>
          </span>
        )
        return (
          <ListGroupItem header={address} key={`driver_${index}`}>
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
              <h1>Insurance agent</h1>
            </Col>
          </Row>
          {
            this.props.agent.vehicleData === false ? (
              <Row>
                <Col lg={8}>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Enter VIN code"
                      name="vinCode"
                      value={this.props.agent.vinCode}
                      onChange={this.updateTextField}
                    />
                    <Button
                      bsStyle="success"
                      onClick={this.getVehicleData}
                      disabled={this.props.agent.requestingData || this.props.agent.vinCode === ''}
                    >
                      {this.props.agent.requestingData === true ? 'Loading...' : 'Request data'}
                    </Button>
                  </Form>
                </Col>
              </Row>
            ) : (
              <div>
                <Row>
                  <Col lg={8}>
                    <Panel header="Vehicle policy">
                      <a href={`https://wavesexplorer.com/address/${this.props.agent.vehicleData.address}`} target="_blank">
                        {this.props.agent.vehicleData.address}
                      </a>
                    </Panel>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8}>
                    <div>
                      <h2>Vehicle policy</h2>
                      {
                        this.props.agent.policyData === false ? (
                            <div>
                              <p><Glyphicon glyph="info-sign" /> Nothing to display</p>
                              <Form inline>
                                <FormControl
                                  type="text"
                                  placeholder="Enter policy code"
                                  name="policyCode"
                                  value={this.props.agent.policyCode}
                                  onChange={this.updateTextField}
                                  disabled={
                                    this.props.agent.drivers.list === false ||
                                    (
                                      this.props.agent.drivers.list &&
                                      this.props.agent.drivers.list.length === 0
                                    )
                                  }
                                />
                                <Button
                                  bsStyle="success"
                                  onClick={this.addPolicy}
                                  disabled={
                                    this.props.agent.addingPolicy ||
                                    this.props.agent.policyCode === ''
                                  }
                                >
                                  {this.props.agent.addingPolicy === true ? 'Loading...' : 'Add policy'}
                                </Button>
                              </Form>
                            </div>
                          ) : (
                            <Panel header="Vehicle address">
                              <a href={`https://wavesexplorer.com/address/${this.props.agent.vehicleData.address}`} target="_blank">
                                {this.props.agent.vehicleData.address}
                              </a>
                            </Panel>
                          )
                      }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8}>
                    <h2>Drivers</h2>
                    {
                      this.props.agent.drivers.list === false ? (
                        <p><Glyphicon glyph="info-sign" /> Nothing to display</p>
                      ) : (
                        <ListGroup>{drivers}</ListGroup>
                      )
                    }
                    <Form inline>
                      <FormControl
                        type="text"
                        placeholder="Enter driver code"
                        name="driverCode"
                        value={this.props.agent.driverCode}
                        onChange={this.updateTextField}
                      />
                      <Button
                        bsStyle="success"
                        onClick={this.addDriver}
                        disabled={this.props.agent.addingDriver || this.props.agent.driverCode === ''}
                      >
                        {this.props.agent.addingDriver === true ? 'Loading...' : 'Add driver'}
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </div>
            )
          }
        </Grid>
      </Content>
    );
  }
}

Agent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  agent: makeSelectAgent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVehicleDataSubmit: () => dispatch(getVehicleDataSubmit()),
    addPolicySubmit: () => dispatch(addPolicySubmit()),
    addDriverSubmit: () => dispatch(addDriverSubmit()),
    updateTextField: (fieldName, fieldValue) => dispatch(updateTextField(fieldName, fieldValue)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Agent', reducer });
const withSaga = injectSaga({ key: 'Agent', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Agent);
