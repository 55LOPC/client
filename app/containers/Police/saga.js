import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { HOST } from './../../api';


import {
  getVehicleDataSuccess,
  getVehicleDataNoContent,
  getVehicleDataError,
  addFineSuccess,
  addFineError,
} from './actions';

import makeSelectPolice from './selectors';


import {
  GET_VEHICLE_DATA_SUBMIT,
  ADD_FINE_SUBMIT,
} from './constants';


const request = require('superagent');

export function* getVehicleData() {
  const req = yield request
    .get(`${HOST}/api/v1/registration`)
    .query('tx', 'string')
    .then((res) => (res))
    .catch((err) => (err));

  yield put(getVehicleDataSuccess({
    'address': '3P48EX6fMWHDFaxqfdRvgyRF7KcC65FQdVU',
  }));


  if (req.statusCode === 200) {
    yield put(getVehicleDataSuccess(JSON.parse(req.text).data));
  } else if (req.statusCode === 204) {
    yield put(getVehicleDataNoContent());
  } else {
    yield put(getVehicleDataError());
  }
}


export function* addFine() {
  const state = yield select(makeSelectPolice());

  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      vinCode: state.vinCode,
    })
    .then((res) => (res))
    .catch((err) => (err));

  yield put(addFineSuccess({
    fineCode: Math.random().toString(36).substring(2).toUpperCase(),
    tx: '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs',
  }));

  if (req.statusCode === 200) {
    yield put(addFineSuccess(JSON.parse(req.text)));
  } else {
    yield put(addFineError());
  }
}






export function* getVehicleDataSubmit() {
  yield fork(takeLatest, GET_VEHICLE_DATA_SUBMIT, getVehicleData);
}

export function* addFineSubmit() {
  yield fork(takeLatest, ADD_FINE_SUBMIT, addFine);
}


export default function* defaultSaga() {
  const getVehicleDataSubmitWatcher = yield fork(getVehicleDataSubmit);
  const addFineSubmitWatcher = yield fork(addFineSubmit);
  yield take(LOCATION_CHANGE);
  yield cancel(getVehicleDataSubmitWatcher);
  yield cancel(addFineSubmitWatcher);
}
