/*
 *
 * Dealer actions
 *
 */

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


export function getVehicleData() {
  return {
    type: GET_VEHICLE_DATA,
  };
}

export function getVehicleDataSubmit() {
  return {
    type: GET_VEHICLE_DATA_SUBMIT,
  };
}

export function getVehicleDataSuccess(vehicleData) {
  return {
    type: GET_VEHICLE_DATA_SUCCESS,
    vehicleData,
  };
}

export function getVehicleDataNoContent() {
  return {
    type: GET_VEHICLE_DATA_NO_CONTENT,
  };
}

export function getVehicleDataError() {
  return {
    type: GET_VEHICLE_DATA_ERROR,
  };
}

export function updateTextField(fieldName, fieldValue) {
  return {
    type: UPDATE_TEXTFIELD,
    fieldName,
    fieldValue,
  };
}

export function addError() {
  return {
    type: ADD_ERROR,
  };
}

export function addErrorSubmit() {
  return {
    type: ADD_ERROR_SUBMIT,
  };
}

export function addErrorSuccess(errorData) {
  return {
    type: ADD_ERROR_SUCCESS,
    errorData,
  };
}

export function addErrorError() {
  return {
    type: ADD_ERROR_ERROR,
  };
}


export function getErrors() {
  return {
    type: GET_ERRORS,
  };
}

export function getErrorsSubmit() {
  return {
    type: GET_ERRORS_SUBMIT,
  };
}

export function getErrorsSuccess(carOptionData) {
  return {
    type: GET_ERRORS_SUCCESS,
    carOptionData,
  };
}

export function getErrorsError() {
  return {
    type: GET_ERRORS_ERROR,
  };
}


export function fixError(errorTx) {
  return {
    type: FIX_ERROR,
    errorTx,
  };
}

export function fixErrorSubmit() {
  return {
    type: FIX_ERROR_SUBMIT,
  };
}

export function fixErrorSuccess(errorData) {
  return {
    type: FIX_ERROR_SUCCESS,
    errorData,
  };
}

export function fixErrorNoContent() {
  return {
    type: FIX_ERROR_NO_CONTENT,
  };
}

export function fixErrorError() {
  return {
    type: FIX_ERROR_ERROR,
  };
}
