import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel, select } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { HOST } from './../../api';


import {
  manufactureCarSuccess,
  manufactureCarError,
  addOptionSuccess,
  addOptionError,
  requestStatusSuccess,
  requestStatusNoContent,
  requestStatusError,
} from './actions';

import makeSelectManufacturer from './selectors';


import {
  MANUFACTURE_CAR_SUBMIT,
  ADD_OPTION_SUBMIT,
  REQUEST_STATUS_SUBMIT,
} from './constants';


const request = require('superagent');


export function* manufactureCar() {
  const state = yield select(makeSelectManufacturer());

  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      vinCode: state.vinCode,
    })
    .then((res) => (res))
    .catch((err) => (err));

  yield put(manufactureCarSuccess({
    adress: '3P48EX6fMWHDFaxqfdRvgyRF7KcC65FQdVU',
    tx: '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs',
  }));

  if (req.statusCode === 200) {
    yield put(manufactureCarSuccess(JSON.parse(req.text)));
  } else {
    yield put(manufactureCarError());
  }
}


export function* addOption() {
  const state = yield select(makeSelectManufacturer());

  const req = yield request
    .post(`${HOST}/api/v1/registration`)
    .send({
      optionCode: state.optionCode,
    })
    .then((res) => (res))
    .catch((err) => (err));

  yield put(addOptionSuccess({
    'tx': '9FBE4szMtt5wHtghwe2Dmv3qEHX8eFmirUTjL82XxNxs',
    'optionCode': Math.random().toString(36).substring(2).toUpperCase(),
  }));

  if (req.statusCode === 201) {
    yield put(addOptionSuccess(JSON.parse(req.text)));
  } else {
    yield put(addOptionError());
  }
}


export function* requestStatus() {
  const req = yield request
    .get(`${HOST}/amenities`)
    .query('tx', 'string')
    .then((res) => (res))
    .catch((err) => (err));

  if (req.statusCode === 200) {
    yield put(requestStatusSuccess(JSON.parse(req.text).data));
  } else if (req.statusCode === 204) {
    yield put(requestStatusNoContent());
  } else {
    yield put(requestStatusError());
  }
}





export function* manufactureCarSubmit() {
  yield fork(takeLatest, MANUFACTURE_CAR_SUBMIT, manufactureCar);
}

export function* addOptionSubmit() {
  yield fork(takeLatest, ADD_OPTION_SUBMIT, addOption);
}

export function* requestStatusSubmit() {
  yield fork(takeLatest, REQUEST_STATUS_SUBMIT, requestStatus);
}


export default function* defaultSaga() {
  const manufactureCarSubmitWatcher = yield fork(manufactureCarSubmit);
  const addOptionSubmitWatcher = yield fork(addOptionSubmit);
  const requestStatusSubmitWatcher = yield fork(requestStatusSubmit);
  yield take(LOCATION_CHANGE);
  yield cancel(manufactureCarSubmitWatcher);
  yield cancel(addOptionSubmitWatcher);
  yield cancel(requestStatusSubmitWatcher);
}
