/**
 *
 * Police
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPolice from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  updateTextField,
  getVehicleDataSubmit,
  addFineSubmit,
} from './actions';

import RootButton from 'components/RootButton';

import Content from './styles/Content';
import { Grid, Row, Col, Alert, Form, FormGroup, FormControl, Button, Panel, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap';

export class Police extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  getVehicleDataSubmit = () => {
    this.props.getVehicleDataSubmit();
  }

  addFineSubmit = () => {
    this.props.addFineSubmit();
  }

  updateTextField = (event) => {
    this.props.updateTextField(event.target.name, event.target.value);
  }

  render() {

    const fines = this.props.police.fines.list === false ? null : (
      this.props.police.fines.list.map((item, index) => {
        return (
          <ListGroupItem header={`Fine code: ${item.fineCode}`} key={`car_code_${index}`}>
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
              <h1>Policeman</h1>
            </Col>
          </Row>
          {
            this.props.police.vehicleData === false ? (
              <Row>
                <Col lg={8}>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Enter VIN code"
                      name="vinCode"
                      value={this.props.police.vinCode}
                      onChange={this.updateTextField}
                    />
                    <Button
                      bsStyle="success"
                      onClick={this.getVehicleDataSubmit}
                      disabled={this.props.police.requestindData || this.props.police.vinCode === ''}
                    >
                      {this.props.police.requestindData === true ? 'Loading...' : 'Get vehicle data'}
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
                    <Panel header="Vehicle address">
                      {this.props.police.vehicleData.address}
                    </Panel>
                  </Col>
                </Row>
                <Row >
                  <Col lg={8}>
                    <h2>Fines</h2>
                    {
                      fines ? (
                        <ListGroup>{fines}</ListGroup>
                      ) : <p><Glyphicon glyph="info-sign" /> Nothing to display</p>
                    }
                    <Form inline>
                      <FormControl
                        type="text"
                        placeholder="Enter fine code"
                        name="fineCode"
                        value={this.props.police.fineCode}
                        onChange={this.updateTextField}
                      />
                      <Button
                        bsStyle="success"
                        onClick={this.addFineSubmit}
                        disabled={this.props.police.addingFine || this.props.police.fineCode === ''}
                      >
                        {this.props.police.addingFine === true ? 'Loading...' : 'Add fine'}
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

Police.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  police: makeSelectPolice(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getVehicleDataSubmit: () => dispatch(getVehicleDataSubmit()),
    addFineSubmit: () => dispatch(addFineSubmit()),
    updateTextField: (fieldName, fieldValue) => dispatch(updateTextField(fieldName, fieldValue)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'Police', reducer });
const withSaga = injectSaga({ key: 'Police', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Police);
