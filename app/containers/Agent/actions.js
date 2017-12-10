/*
 *
 * Agent actions
 *
 */

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


export function updateTextField(fieldName, fieldValue) {
  return {
    type: UPDATE_TEXTFIELD,
    fieldName,
    fieldValue,
  };
}


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


export function addPolicy() {
  return {
    type: ADD_POLICY,
  };
}

export function addPolicySubmit() {
  return {
    type: ADD_POLICY_SUBMIT,
  };
}

export function addPolicySuccess(policyData) {
  return {
    type: ADD_POLICY_SUCCESS,
    policyData,
  };
}

export function addPolicyError() {
  return {
    type: ADD_POLICY_ERROR,
  };
}


export function addDriver() {
  return {
    type: ADD_DRIVER,
  };
}

export function addDriverSubmit() {
  return {
    type: ADD_DRIVER_SUBMIT,
  };
}

export function addDriverSuccess(driverData) {
  return {
    type: ADD_DRIVER_SUCCESS,
    driverData,
  };
}

export function addDriverError() {
  return {
    type: ADD_DRIVER_ERROR,
  };
}
