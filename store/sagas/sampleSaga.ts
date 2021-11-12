import {PayloadAction} from "@reduxjs/toolkit";
import {delay, put, takeLatest} from 'redux-saga/effects'
import {sampleActions} from "../modules/sample";

function * sampleUpCount(action:PayloadAction<number>) {
  yield delay(2000)
  yield put(sampleActions.upCountSuccess(action.payload))
}

function * sampleDownCount(action:PayloadAction<number>) {
  yield delay(2000)
  yield put(sampleActions.downCountSuccess(action.payload))
}

function * watchSampleSaga(){
  yield takeLatest(sampleActions.upCount, sampleUpCount);
  yield takeLatest(sampleActions.downCount, sampleDownCount);
}

const sample = [
  watchSampleSaga()
]

export default sample