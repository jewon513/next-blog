import { all } from "redux-saga/effects";
import sampleSaga from "./sampleSaga";

export default function* rootSagas() {
  yield all([
    ...sampleSaga
  ])
}