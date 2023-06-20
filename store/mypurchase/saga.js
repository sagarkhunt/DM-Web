
import { get, post } from "@/utils/axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    addRatingFailed,
  addRatingSuccess,
  purchaseListFailed,
  purchaseListSuccess,
  moreProductFailed,
moreProductSuccess
} from "./action";
import { ADD_RATING_REQUEST, PURCHASE_LIST_REQUEST,MORE_PRODUCT_REQUEST } from "./actionTypes";

function* purchaseList({ payload: data }) {
  try {
    const response = yield call(get, `/users/order`, data);
    yield put(purchaseListSuccess(response));
  } catch (error) {
    yield put(purchaseListFailed(error));
  }
}

/** Add Rating */
function* addUserRating({ payload: { data, purchaseId } }) {
  try {
    const response = yield call(post, `/rating/${purchaseId}`, data);
    yield put(addRatingSuccess(response));
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(addRatingFailed(error));
  }
}

function* moreProductList({ payload: data }) {
  try {
    const response = yield call(get, `/projects/popular-projects`, data);
    yield put(moreProductSuccess(response));
  } catch (error) {
    yield put(moreProductFailed(error));
  }
}

function* PurchaseSaga() {
  yield takeLatest(PURCHASE_LIST_REQUEST, purchaseList);
  yield takeLatest(ADD_RATING_REQUEST, addUserRating);
  yield takeLatest(MORE_PRODUCT_REQUEST, moreProductList);
}

export default PurchaseSaga;
