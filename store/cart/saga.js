import { call, put, takeLatest } from "redux-saga/effects";
import { get, post, putApi } from "../../utils/axios";
import {
  addToCartFailed,
  addToCartSuccess,
  cartCountFailed,
  cartCountSuccess,
  listCartFailed,
  listCartSuccess,
  listCheckoutFailed,
  listCheckoutSuccess,
} from "./actions";
import {
  ADD_TO_CART_REQUEST,
  CART_COUNT_REQUEST,
  LIST_CART_REQUEST,
  LIST_CHECKOUT_REQUEST,
} from "./actionTypes";
import { uniqueId } from "@/utils/uId";

/* Cart list api */
function* cartList({ payload: data }) {
  try {
    const data = uniqueId();
    const response = yield call(get, `/cart?uid=${data?.uid}`, data);
    yield put(listCartSuccess(response));
  } catch (error) {
    yield put(listCartFailed(error));
  }
}
/**cart count */
function* cartCount() {
  try {
    const data = uniqueId();
    const response = yield call(get, `/cart/cart-count?uid=${data?.uid}`);
    yield put(cartCountSuccess(response));
  } catch (error) {
    yield put(cartCountFailed(error));
  }
}

function* cartCheckoutList({ payload: data }) {
  try {
    const response = yield call(putApi, "/users/order", data);
    yield put(listCheckoutSuccess(response));
  } catch (error) {
    yield put(listCheckoutFailed(error));
  }
}
/* Add to Cart api */
function* addToCart({ payload: { projectId } }) {
  try {
    const data = uniqueId();
    const response = yield call(post, `/cart/${projectId}`,data);
    yield put(addToCartSuccess(response));
  } catch (error) {
    yield put(addToCartFailed(error));
  }
}

function* CartSaga() {
  yield takeLatest(LIST_CART_REQUEST, cartList);
  yield takeLatest(ADD_TO_CART_REQUEST, addToCart);
  yield takeLatest(LIST_CHECKOUT_REQUEST, cartCheckoutList);
  yield takeLatest(CART_COUNT_REQUEST, cartCount);
}

export default CartSaga;
