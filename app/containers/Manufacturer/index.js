/**
 *
 * Manufacturer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManufacturer from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  updateTextField,
  manufactureCarSubmit,
  addOptionSubmit,
} from './actions';

import RootButton from 'components/RootButton';

import Content from './styles/Content';
import { Grid, Row, Col, Alert, Form, FormGroup, FormControl, Button, Panel, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

export class Manufacturer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  manufactureCar = () => {
    this.props.manufactureCarSubmit();
  }

  addOption = () => {
    this.props.addOptionSubmit();
  }

  updateTextField = (event) => {
    this.props.updateTextField(event.target.name, event.target.value);
  }

  render() {

    const carOptions = this.props.manufacturer.carOptions.list === false ? null : (
      this.props.manufacturer.carOptions.list.map((item, index) => {
        return (
          <ListGroupItem header={`Option code: ${item.optionCode}`} key={`car_code_${index}`}>
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
              <h1>Volkswagen</h1>
            </Col>
          </Row>
          {
            this.props.manufacturer.carData === false ? (
              <Row>
                <Col lg={8}>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Enter VIN code"
                      name="vinCode"
                      value={this.props.manufacturer.vinCode}
                      onChange={this.updateTextField}
                    />
                    <Button
                      bsStyle="success"
                      onClick={this.manufactureCar}
                      disabled={this.props.manufacturer.addingCar || this.props.manufacturer.vinCode === ''}
                    >
                      {this.props.manufacturer.addingCar === true ? 'Loading...' : 'Add Vehicle'}
                    </Button>
                  </Form>
                </Col>
              </Row>
            ) : (
              <div>
                <Row >
                  <Col lg={8}>
                    <h2 className="init">Vehicle data</h2>
                  </Col>
                </Row>
                <Row >
                  <Col lg={8}>
                    <Panel header="VIN code">
                      {this.props.manufacturer.vinCode}
                    </Panel>
                  </Col>
                </Row>
                <Row >
                  <Col lg={8}>
                    <Panel header="Waves Tx">
                      {
                        this.props.manufacturer.carData === false ? 'Block generation in progress...' :
                          <a href={`https://wavesexplorer.com/tx/${this.props.manufacturer.carData.tx}`} target="_blank">
                            {this.props.manufacturer.carData.tx}
                          </a>
                      }
                    </Panel>
                  </Col>
                </Row>
                <Row >
                  <Col lg={8}>
                    <Panel header="Vehicle adress">
                      {
                        this.props.manufacturer.carData === false ? 'Block generation in progress...' :

                          <a href={`https://wavesexplorer.com/address/${this.props.manufacturer.carData.adress}`} target="_blank">
                            {this.props.manufacturer.carData.adress}
                          </a>
                      }
                    </Panel>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8}>
                    <h2>Car options</h2>
                    {carOptions ? (
                      <ListGroup>{carOptions}</ListGroup>
                    ) : <p><Glyphicon glyph="info-sign" /> Nothing to display</p>}
                  </Col>
                </Row>
                <Row >
                  <Col lg={8}>
                    <Form inline>
                      <FormControl
                        type="text"
                        placeholder="Enter option code"
                        name="optionCode"
                        value={this.props.manufacturer.optionCode}
                        onChange={this.updateTextField}
                      />
                      <Button
                        bsStyle="success"
                        onClick={this.addOption}
                        disabled={this.props.manufacturer.addingOption || this.props.manufacturer.optionCode === ''}
                      >
                        {this.props.manufacturer.addingOption === true ? 'Loading...' : 'Add option'}
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

Manufacturer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manufacturer: makeSelectManufacturer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    manufactureCarSubmit: () => dispatch(manufactureCarSubmit()),
    addOptionSubmit: () => dispatch(addOptionSubmit()),
    updateTextField: (fieldName, fieldValue) => dispatch(updateTextField(fieldName, fieldValue)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manufacturer', reducer });
const withSaga = injectSaga({ key: 'manufacturer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Manufacturer);
