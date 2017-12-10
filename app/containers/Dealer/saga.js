import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { HOST } from './../../api';


import {
  getVehicleDataSuccess,
  getVehicleDataNoContent,
  getVehicleDataError,
  addErrorSuccess,
  addErrorError,
  getErrorsSuccess,
  getErrorsError,
  fixErrorSuccess,
  fixErrorNoContent,
  fixErrorError,
} from './actions';

import makeSelectDealer from './selectors';


import {
  GET_VEHICLE_DATA_SUBMIT,
  ADD_ERROR_SUBMIT,
  GET_ERRORS_SUBMIT,
  FIX_ERROR_SUBMIT,
} from './constants';


const request = require('superagent');

export function* getVehicleData() {
  const state = yield select(makeSelectDealer());
  const req = yield request
    .get(`${HOST}/api/v1/registration`)
    .query('vinCode', state.vinCode)
    .then((res) => (res))
    .catch((err) => (err));

  yield put(getVehicleDataSuccess({
    address: '3PAs2qSeUAfgqSKS8LpZPKGYEjJKcud9Djr',
  }));

  if (req.statusCode === 200) {
    yield put(getVehicleDataSuccess(JSON.parse(req.text).data));
  } else if (req.statusCode === 204) {
    yield put(getVehicleDataNoContent());
  } else {
    yield put(getVehicleDataError());
  }
}

export function* addError() {
  const state = yield select(makeSelectDealer());
  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      vinCode: state.vinCode,
    })
    .then((res) => (res))
    .catch((err) => (err));

  yield put(addErrorSuccess({
    errorCode: Math.random().toString(36).substring(2).toUpperCase(),
    tx: '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs',
  }));

  if (req.statusCode === 200) {
    yield put(addErrorSuccess(JSON.parse(req.text)));
  } else {
    yield put(addErrorError());
  }
}


export function* getErrors() {
  const state = yield select(makeSelectDealer());
  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      optionCode: state.optionCode,
    })
    .then((res) => (res))
    .catch((err) => (err));

  yield put(getErrorsSuccess({
    'tx': '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs',
    'optionCode': Math.random().toString(36).substring(2).toUpperCase(),
  }));

  if (req.statusCode === 201) {
    yield put(getErrorsSuccess(JSON.parse(req.text)));
  } else {
    yield put(getErrorsError());
  }
}


export function* fixError() {
  const state = yield select(makeSelectDealer());
  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      errorTx: state.errorTx,
    })
    .then((res) => (res))
    .catch((err) => (err));
    
  yield put(fixErrorSuccess({
    errorTx: '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs'
  }));


  if (req.statusCode === 200) {
    yield put(fixErrorSuccess(JSON.parse(req.text).data));
  } else if (req.statusCode === 204) {
    yield put(fixErrorNoContent());
  } else {
    yield put(fixErrorError());
  }
}



export function* getVehicleDataSubmit() {
  yield fork(takeLatest, GET_VEHICLE_DATA_SUBMIT, getVehicleData);
}

export function* addErrorSubmit() {
  yield fork(takeLatest, ADD_ERROR_SUBMIT, addError);
}

export function* getErrorsSubmit() {
  yield fork(takeLatest, GET_ERRORS_SUBMIT, getErrors);
}

export function* fixErrorSubmit() {
  yield fork(takeLatest, FIX_ERROR_SUBMIT, fixError);
}


export default function* defaultSaga() {
  const getVehicleDataWatcher = yield fork(getVehicleDataSubmit);
  const addErrorSubmitWatcher = yield fork(addErrorSubmit);
  const getErrorsSubmitWatcher = yield fork(getErrorsSubmit);
  const fixErrorSubmitWatcher = yield fork(fixErrorSubmit);
  yield take(LOCATION_CHANGE);
  yield cancel(getVehicleDataWatcher);
  yield cancel(addErrorSubmitWatcher);
  yield cancel(getErrorsSubmitWatcher);
  yield cancel(fixErrorSubmitWatcher);
}
