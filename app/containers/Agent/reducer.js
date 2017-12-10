/*
 *
 * Agent reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_TEXTFIELD,

  GET_VEHICLE_DATA,
  GET_VEHICLE_DATA_SUBMIT,
  GET_VEHICLE_DATA_SUCCESS,
  GET_VEHICLE_DATA_NO_CONTENT,
  GET_VEHICLE_DATA_ERROR,

  ADD_POLICY,
  ADD_POLICY_SUBMIT,
  ADD_POLICY_SUCCESS,
  ADD_POLICY_ERROR,

  ADD_DRIVER,
  ADD_DRIVER_SUBMIT,
  ADD_DRIVER_SUCCESS,
  ADD_DRIVER_ERROR,
} from './constants';

const initialState = fromJS({
  vinCode: '',
  policyCode: '',
  driverCode: '',
  vehicleData: false,
  policyData: false,
  drivers: {
    list: false,
  },
  requestingData: false,
  addingPolicy: false,
  addingDriver: false,
});

function AgentReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TEXTFIELD:
      return state
        .set(action.fieldName, action.fieldValue);
    case GET_VEHICLE_DATA:
      return state;
    case GET_VEHICLE_DATA_SUBMIT:
      return state
        .set('requestingData', true);
    case GET_VEHICLE_DATA_SUCCESS:
      return state
        .set('vehicleData', action.vehicleData)
        .set('requestingData', false);
    case GET_VEHICLE_DATA_NO_CONTENT:
      return state;
    case GET_VEHICLE_DATA_ERROR:
      return state;
    case ADD_POLICY:
      return state;
    case ADD_POLICY_SUBMIT:
      return state
        .set('addingPolicy', true);
    case ADD_POLICY_SUCCESS:
      return state
        .set('addingPolicy', false)
        .set('policyData', action.policyData);
    case ADD_POLICY_ERROR:
      return state;
    case ADD_DRIVER:
      return state;
    case ADD_DRIVER_SUBMIT:
      return state
        .set('addingDriver', true);
    case ADD_DRIVER_SUCCESS:
      let driversList = state.getIn(['drivers', 'list']);
      const drivers = driversList === false ?
        [action.driverData] : driversList.concat(action.driverData);
      return state
        .set('driverCode', '')
        .set('addingDriver', false)
        .setIn(['drivers', 'list'], drivers);
    case ADD_DRIVER_ERROR:
      return state;
    default:
      return state;
  }
}

export default AgentReducer;
