/*
 *
 * Police reducer
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

  ADD_FINE,
  ADD_FINE_SUBMIT,
  ADD_FINE_SUCCESS,
  ADD_FINE_ERROR,
} from './constants';

const initialState = fromJS({
  vinCode: '',
  fineCode: '',
  vehicleData: false,
  fines: {
    list: false
  },
  requestindData: false,
  addingFine: false,
});

function PoliceReducer(state = initialState, action) {
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
    case ADD_FINE:
      return state
        .set('addingFine', true);
    case ADD_FINE_SUBMIT:
      return state
        .set('addingFine'. true);
    case ADD_FINE_SUCCESS:
      let finesList = state.getIn(['fines', 'list']);
      const fines = finesList === false ?
        [action.fineData] : finesList.concat(action.fineData);
      return state
        .set('addingFine', false)
        .setIn(['fines', 'list'], fines);
    case ADD_FINE_ERROR:
      return state;
    default:
      return state;
  }
}

export default PoliceReducer;
