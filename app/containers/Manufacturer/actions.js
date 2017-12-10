/*
 *
 * Manufacturer actions
 *
 */

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


export function updateTextField(fieldName, fieldValue) {
  return {
    type: UPDATE_TEXTFIELD,
    fieldName,
    fieldValue,
  };
}

export function manufactureCar() {
  return {
    type: MANUFACTURE_CAR,
  };
}

export function manufactureCarSubmit() {
  return {
    type: MANUFACTURE_CAR_SUBMIT,
  };
}

export function manufactureCarSuccess(carData) {
  return {
    type: MANUFACTURE_CAR_SUCCESS,
    carData,
  };
}

export function manufactureCarError() {
  return {
    type: MANUFACTURE_CAR_ERROR,
  };
}


export function addOption() {
  return {
    type: ADD_OPTION,
  };
}

export function addOptionSubmit() {
  return {
    type: ADD_OPTION_SUBMIT,
  };
}

export function addOptionSuccess(carOptionData) {
  return {
    type: ADD_OPTION_SUCCESS,
    carOptionData,
  };
}

export function addOptionError() {
  return {
    type: ADD_OPTION_ERROR,
  };
}


export function requestStatus() {
  return {
    type: REQUEST_STATUS,
  };
}

export function requestStatusSubmit(tx) {
  return {
    type: REQUEST_STATUS_SUBMIT,
    tx,
  };
}

export function requestStatusSuccess() {
  return {
    type: REQUEST_STATUS_SUCCESS,
  };
}

export function requestStatusNoContent() {
  return {
    type: REQUEST_STATUS_NO_CONTENT,
  };
}

export function requestStatusError() {
  return {
    type: REQUEST_STATUS_ERROR,
  };
}
