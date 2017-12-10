/*
 *
 * Dealer reducer
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

  ADD_ERROR,
  ADD_ERROR_SUBMIT,
  ADD_ERROR_SUCCESS,
  ADD_ERROR_ERROR,

  GET_ERRORS,
  GET_ERRORS_SUBMIT,
  GET_ERRORS_SUCCESS,
  GET_ERRORS_ERROR,

  FIX_ERROR,
  FIX_ERROR_SUBMIT,
  FIX_ERROR_SUCCESS,
  FIX_ERROR_NO_CONTENT,
  FIX_ERROR_ERROR,
} from './constants';

const initialState = fromJS({
  vinCode: '',
  errorCode: '',
  vehicleData: false,
  errors: {
    active: false,
    fixed: false,
  },
  errorTx: false,
  addingError: false,
  fixingError: false,
  requestingData: false,
});

function dealerReducer(state = initialState, action) {
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
        .set('requestingData', false)
        .set('vehicleData', action.vehicleData);
    case GET_VEHICLE_DATA_NO_CONTENT:
      return state;
    case GET_VEHICLE_DATA_ERROR:
      return state;
    case ADD_ERROR:
      return state;
    case ADD_ERROR_SUBMIT:
      return state
        .set('addingError', true);
    case ADD_ERROR_SUCCESS:
      const activeErrors = state.getIn(['errors', 'active']) === false ?
        [action.errorData] : state.getIn(['errors', 'active']).concat(action.errorData);
      return state
        .set('addingError', false)
        .setIn(['errors', 'active'], activeErrors);
    case ADD_ERROR_ERROR:
      return state;
    case GET_ERRORS:
      return state;
    case GET_ERRORS_SUBMIT:
      return state;
    case GET_ERRORS_SUCCESS:
      // const activeErrorsList = tate.getIn(['errors', 'list']) === false ?
      //   [action.errorData] : tate.getIn(['errors', 'list']).concat(action.errorData);
      return state
        .setIn(['errors', 'active'], [])
        .setIn(['errors', 'fixed'], []);
    case GET_ERRORS_ERROR:
      return state;
    case FIX_ERROR:
      return state
        .set('errorCode', '')
        .set('errorTx', action.errorTx);
    case FIX_ERROR_SUBMIT:
      return state
        .set('fixingError', true);
    case FIX_ERROR_SUCCESS:
      let errorIndex = 0;
      let fixedActiveErrors = state.getIn(['errors', 'active']);

      for (let i = 0; i < fixedActiveErrors.length; i += 1) {
        let item = fixedActiveErrors[i];
        if (item.tx === action.errorData.errorTx) {
          errorIndex = i;
          break;
        }
      }

      const fixedError = fixedActiveErrors.splice(errorIndex, 1)[0];
      const fixedErrorsList = state.getIn(['errors', 'fixed']) === false ?
        [fixedError] : state.getIn(['errors', 'fixed']).concat(fixedError);
      return state
        .set('fixingError', false)
        .set('errorTx', false)
        .setIn(['errors', 'active'], fixedActiveErrors.length === 0 ? false : fixedErrorsList)
        .setIn(['errors', 'fixed'], fixedErrorsList);
    case FIX_ERROR_NO_CONTENT:
      return state;
    case FIX_ERROR_ERROR:
      return state;
    default:
      return state;
  }
}

export default dealerReducer;
