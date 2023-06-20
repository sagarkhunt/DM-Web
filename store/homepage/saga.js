import { get } from "@/utils/axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  getProjectListFailed,
  getProjectListSuccess
} from "./actions";

import { PROJECT_LIST_REQUEST } from "./actionTypes";

/**
 * @param {getCategoryByProjectList} payload
 */
function* getCategoryByProjectList() {
  try {
    const response = yield call(get, `/category/trending-category-projects`);
    if (response) {
      yield put(getProjectListSuccess(response));
    }
  } catch (error) {
    yield put(getProjectListFailed(error));
  }
}

function* homePageSaga() {
  yield takeLatest(PROJECT_LIST_REQUEST, getCategoryByProjectList);
}

export default homePageSaga;
