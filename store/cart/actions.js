import {
  LIST_CART_FAILED,
  LIST_CART_REQUEST,
  LIST_CART_SUCCESS,
  ADD_TO_CART_FAILED,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  LIST_CHECKOUT_REQUEST,
  LIST_CHECKOUT_SUCCESS,
  LIST_CHECKOUT_FAILED,
  CAR_COUNT_REQUEST,
  CAR_COUNT_SUCCESS,
  CART_COUNT_REQUEST,
  CART_COUNT_SUCCESS,
  CART_COUNT_FAILED,
} from "./actionTypes";

/**
 * @param {*list cart } payload
 * @returns
 */
export const listCartRequest = (data) => {
  return {
    type: LIST_CART_REQUEST,
    payload: data,
  };
};
export const listCartSuccess = (data) => {
  return {
    type: LIST_CART_SUCCESS,
    payload: data,
  };
};
export const listCartFailed = (error) => {
  return {
    type: LIST_CART_FAILED,
    payload: error,
  };
};

/**
 * @param {getcheckoutlist} data 
 * @returns 
 */
export const listCheckoutRequest = (data) => {
  return {
    type: LIST_CHECKOUT_REQUEST,
    payload: data,
  };
};
export const listCheckoutSuccess = (data) => {
  return {
    type: LIST_CHECKOUT_SUCCESS,
    payload: data,
  };
};
export const listCheckoutFailed = (error) => {
  return {
    type: LIST_CHECKOUT_FAILED,
    payload: error,
  };
};
/**
 * @param {*add To cart } payload
 * @returns
 */
export const addToCartRequest = (data) => {
  return {
    type: ADD_TO_CART_REQUEST,
    payload: data,
  };
};
export const addToCartSuccess = (data) => {
  return {
    type: ADD_TO_CART_SUCCESS,
    payload: data,
  };
};
export const addToCartFailed = (error) => {
  return {
    type: ADD_TO_CART_FAILED,
    payload: error,
  };
};

/**
 * 
 * @param {carCount} data 
 * @returns 
 */
export const cartCountRequest = () => {
  return {
    type: CART_COUNT_REQUEST,
    // payload: data,
  };
};
export const cartCountSuccess = (data) => {
  return {
    type: CART_COUNT_SUCCESS,
    payload: data,
  };
};
export const cartCountFailed = (error) => {
  return {
    type: CART_COUNT_FAILED,
    payload: error,
  };
};