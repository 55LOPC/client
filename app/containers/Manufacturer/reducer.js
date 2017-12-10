/*
 *
 * Manufacturer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_TEXTFIELD,

  MANUFACTURE_CAR,
  MANUFACTURE_CAR_SUBMIT,
  MANUFACTURE_CAR_SUCCESS,
  MANUFACTURE_CAR_ERROR,

  ADD_OPTION,
  ADD_OPTION_SUBMIT,
  ADD_OPTION_SUCCESS,
  ADD_OPTION_ERROR,

  REQUEST_STATUS,
  REQUEST_STATUS_SUBMIT,
  REQUEST_STATUS_SUCCESS,
  REQUEST_STATUS_NO_CONTENT,
  REQUEST_STATUS_ERROR,
} from './constants';

const initialState = fromJS({
  vinCode: '',
  optionCode: '',
  carData: false,
  carOptions: {
    list: false,
  },
  addingCar: false,
  addingOption: false,
});

function manufacturerReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_TEXTFIELD:
      return state
        .set(action.fieldName, action.fieldValue);
    case MANUFACTURE_CAR:
      return state;
    case MANUFACTURE_CAR_SUBMIT:
      return state
        .set('addingCar', true);
    case MANUFACTURE_CAR_SUCCESS:
      return state
        .set('addingCar', false)
        .set('carData', action.carData);
    case MANUFACTURE_CAR_ERROR:
      return state;
    case ADD_OPTION:
      return state
        .set('addingOption', true);
    case ADD_OPTION_SUBMIT:
      return state;
    case ADD_OPTION_SUCCESS:
      let carOptionsList = state.getIn(['carOptions', 'list']);
      const carOptions = carOptionsList === false ?
        [action.carOptionData] : carOptionsList.concat(action.carOptionData);
      return state
        .setIn(['carOptions', 'list'], carOptions);
    case ADD_OPTION_ERROR:
      return state;
    case REQUEST_STATUS:
      return state;
    case REQUEST_STATUS_SUBMIT:
      return state;
    case REQUEST_STATUS_SUCCESS:
      return state;
    case REQUEST_STATUS_NO_CONTENT:
      return state;
    case REQUEST_STATUS_ERROR:
      return state;
    default:
      return state;
  }
}

export default manufacturerReducer;
