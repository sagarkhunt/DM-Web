import { call, put, takeLatest } from "redux-saga/effects";
import { get } from "../../utils/axios";
import {
  detailsCateoryFailed,
  detailsCateorySuccess,
  listCateoryFailed,
  listCateorySuccess,
  listCateoryUserWiseFailed,
  listCateoryUserWiseSuccess,
  listProjectsCateoryFailed,
  listProjectsCateorySuccess,
  listSubCateoryFailed,
  listSubCateorySuccess,
} from "./actions";
import {
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_USER_WISE_REQUEST,
  CATEGORY_PRO_LIST_REQUEST,
  CATEGORY_SUB_LIST_REQUEST,
} from "./actionTypes";

/* Category list api */
function* categoryList({ payload: data }) {
  try {
    const response = yield call(get, "/category/main", data);
    yield put(listCateorySuccess(response));
  } catch (error) {
    yield put(listCateoryFailed(error));
  }
}

/* Category Project list api */
function* categoryProjectList({ payload: data }) {
  try {
    const response = yield call(get, "/category/main", data);
    yield put(listProjectsCateorySuccess(response));
  } catch (error) {
    yield put(listProjectsCateoryFailed(error));
  }
}
/* Category Project list api */
function* categoryListUserWise({ payload: data }) {
  try {
    const response = yield call(get, "/category/main", data);
    yield put(listCateoryUserWiseSuccess(response));
  } catch (error) {
    yield put(listCateoryUserWiseFailed(error));
  }
}

/* Category details api */
function* categoryDetails({ payload }) {
  try {
    const response = yield call(get, `category/single/${payload?.categoryId}`);
    yield put(detailsCateorySuccess(response));
  } catch (error) {
    yield put(detailsCateoryFailed(error));
  }
}

/* Sub Category api */
function* subCategory({ payload }) {
  try {
    const response = yield call(
      get,
      `category/sub-categories/${payload?.categoryId}`
    );
    yield put(listSubCateorySuccess(response));
  } catch (error) {
    yield put(listSubCateoryFailed(error));
  }
}

function* CategorySaga() {
  yield takeLatest(CATEGORY_LIST_REQUEST, categoryList);
  yield takeLatest(CATEGORY_SUB_LIST_REQUEST, subCategory);
  yield takeLatest(CATEGORY_PRO_LIST_REQUEST, categoryProjectList);
  yield takeLatest(CATEGORY_LIST_USER_WISE_REQUEST, categoryListUserWise);
  yield takeLatest(CATEGORY_DETAILS_REQUEST, categoryDetails);
}

export default CategorySaga;
