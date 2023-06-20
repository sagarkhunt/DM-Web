import {
    ADD_RATING_FAILED,
    ADD_RATING_REQUEST,
    ADD_RATING_SUCCESS,
    MORE_PRODUCT_FAILED,
    MORE_PRODUCT_REQUEST,
    MORE_PRODUCT_SUCCESS,
    PURCHASE_LIST_FAILED,
    PURCHASE_LIST_REQUEST,
    PURCHASE_LIST_SUCCESS
} from "./actionTypes";
/**
 *
 * @param {purchaselist} data
 * @returns
 */
export const purchaseListRequest = (data) => {
  return {
    type: PURCHASE_LIST_REQUEST,
    payload: data,
  };
};

export const purchaseListSuccess = (data) => {
  return {
    type: PURCHASE_LIST_SUCCESS,
    payload: data,
  };
};

export const purchaseListFailed = (error) => {
  return {
    type: PURCHASE_LIST_FAILED,
    payload: error,
  };
};
/**
 *
 * @param {addrating} data
 * @returns
 */
export const addRatingRequest = ({ data, purchaseId }) => {
  return {
    type: ADD_RATING_REQUEST,
    payload: { data, purchaseId },
  };
};
export const addRatingSuccess = (data) => {
  return {
    type: ADD_RATING_SUCCESS,
    payload: data,
  };
};

export const addRatingFailed = (error) => {
  return {
    type: ADD_RATING_FAILED,
    payload: error,
  };
};

/**
 * @param {moreProduct List} data
 * @returns
 */
export const moreProductRequest = (data) => {
  return {
    type: MORE_PRODUCT_REQUEST,
    payload: data,
  };
};
export const moreProductSuccess = (data) => {
  return {
    type: MORE_PRODUCT_SUCCESS,
    payload: data,
  };
};
export const moreProductFailed = (error) => {
  return {
    type: MORE_PRODUCT_FAILED,
    payload: data,
  };
};
