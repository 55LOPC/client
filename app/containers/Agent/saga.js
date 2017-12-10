import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { HOST } from './../../api';


import {
  getVehicleDataSuccess,
  getVehicleDataNoContent,
  getVehicleDataError,
  addPolicySuccess,
  addPolicyError,
  addDriverSuccess,
  addDriverError,
} from './actions';

import makeSelectAgent from './selectors';


import {
  GET_VEHICLE_DATA_SUBMIT,
  ADD_POLICY_SUBMIT,
  ADD_DRIVER_SUBMIT,
} from './constants';


const request = require('superagent');

export function* getVehicleData() {
  const state = yield select(makeSelectAgent());
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

export function* addPolicy() {
  const state = yield select(makeSelectAgent());
  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      vinCode: state.vinCode,
    })
    .then((res) => (res))
    .catch((err) => (err));

  yield put(addPolicySuccess({
    address: '3PAs2qSeUAfgqSKS8LpZPKGYEjJKcud9Djr',
    tx: '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs',
  }));

  if (req.statusCode === 200) {
    yield put(addPolicySuccess(JSON.parse(req.text)));
  } else {
    yield put(addPolicyError());
  }
}


export function* addDriver() {
  const state = yield select(makeSelectAgent());
  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      optionCode: state.optionCode,
    })
    .then((res) => (res))
    .catch((err) => (err));

  yield put(addDriverSuccess({
    'address': '3PAs2qSeUAfgqSKS8LpZPKGYEjJKcud9Djr',
    'tx': '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs',
  }));

  if (req.statusCode === 201) {
    yield put(addDriverSuccess(JSON.parse(req.text)));
  } else {
    yield put(addDriverError());
  }
}



export function* getVehicleDataSubmit() {
  yield fork(takeLatest, GET_VEHICLE_DATA_SUBMIT, getVehicleData);
}

export function* addPolicySubmit() {
  yield fork(takeLatest, ADD_POLICY_SUBMIT, addPolicy);
}

export function* addDriverSubmit() {
  yield fork(takeLatest, ADD_DRIVER_SUBMIT, addDriver);
}


export default function* defaultSaga() {
  const getVehicleDataWatcher = yield fork(getVehicleDataSubmit);
  const addPolicySubmitWatcher = yield fork(addPolicySubmit);
  const addDriverSubmitWatcher = yield fork(addDriverSubmit);
  yield take(LOCATION_CHANGE);
  yield cancel(getVehicleDataWatcher);
  yield cancel(addPolicySubmitWatcher);
  yield cancel(addDriverSubmitWatcher);
}
