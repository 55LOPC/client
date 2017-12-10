/*
 *
 * Police actions
 *
 */

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


export function updateTextField(fieldName, fieldValue) {
  return {
    type: UPDATE_TEXTFIELD,
    fieldName,
    fieldValue,
  };
}

export function getVehicleData() {
  return {
    type:GET_VEHICLE_DATA,
  };
}

export function getVehicleDataSubmit() {
  return {
    type:GET_VEHICLE_DATA_SUBMIT,
  };
}

export function getVehicleDataSuccess(vehicleData) {
  return {
    type:GET_VEHICLE_DATA_SUCCESS,
    vehicleData,
  };
}


export function getVehicleDataNoContent() {
  return {
    type:GET_VEHICLE_DATA_NO_CONTENT,
  };
}


export function getVehicleDataError() {
  return {
    type:GET_VEHICLE_DATA_ERROR,
  };
}


export function addFine() {
  return {
    type: ADD_FINE,
  };
}

export function addFineSubmit() {
  return {
    type: ADD_FINE_SUBMIT,
  };
}

export function addFineSuccess(fineData) {
  return {
    type: ADD_FINE_SUCCESS,
    fineData,
  };
}

export function addFineError() {
  return {
    type: ADD_FINE_ERROR,
  };
}
