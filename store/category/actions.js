import {
  CATEGORY_LIST_FAILED,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_PRO_LIST_FAILED,
  CATEGORY_PRO_LIST_REQUEST,
  CATEGORY_PRO_LIST_SUCCESS,
  CATEGORY_SUB_LIST_FAILED,
  CATEGORY_SUB_LIST_REQUEST,
  CATEGORY_SUB_LIST_SUCCESS,
  CATEGORY_DETAILS_FAILED,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_USER_WISE_REQUEST,
  CATEGORY_LIST_USER_WISE_SUCCESS,
  CATEGORY_LIST_USER_WISE_FAILED,
} from "./actionTypes";

/**
 * @param {*get category } payload
 * @returns
 */
export const listCateoryRequest = (data) => {
  return {
    type: CATEGORY_LIST_REQUEST,
    payload: data,
  };
};
export const listCateorySuccess = (data) => {
  return {
    type: CATEGORY_LIST_SUCCESS,
    payload: data,
  };
};
export const listCateoryFailed = (error) => {
  return {
    type: CATEGORY_LIST_FAILED,
    payload: error,
  };
};

/**
 * @param {*get projects category } payload
 * @returns
 */
export const listProjectsCateoryRequest = (data) => {
  return {
    type: CATEGORY_PRO_LIST_REQUEST,
    payload: data,
  };
};
export const listProjectsCateorySuccess = (data) => {
  return {
    type: CATEGORY_PRO_LIST_SUCCESS,
    payload: data,
  };
};
export const listProjectsCateoryFailed = (error) => {
  return {
    type: CATEGORY_PRO_LIST_FAILED,
    payload: error,
  };
};

/**
 * @param {*get Sub category } payload
 * @returns
 */
export const listSubCateoryRequest = (data) => {
  return {
    type: CATEGORY_SUB_LIST_REQUEST,
    payload: data,
  };
};
export const listSubCateorySuccess = (data) => {
  return {
    type: CATEGORY_SUB_LIST_SUCCESS,
    payload: data,
  };
};
export const listSubCateoryFailed = (error) => {
  return {
    type: CATEGORY_SUB_LIST_FAILED,
    payload: error,
  };
};

/**
 * @param {*get category details } payload
 * @returns
 */
export const detailsCateoryRequest = (data) => {
  return {
    type: CATEGORY_DETAILS_REQUEST,
    payload: data,
  };
};
export const detailsCateorySuccess = (data) => {
  return {
    type: CATEGORY_DETAILS_SUCCESS,
    payload: data,
  };
};
export const detailsCateoryFailed = (error) => {
  return {
    type: CATEGORY_DETAILS_FAILED,
    payload: error,
  };
};

/**
 * @param {*get category user wise } payload
 * @returns
 */
export const listCateoryUserWiseRequest = (data) => {
  return {
    type: CATEGORY_LIST_USER_WISE_REQUEST,
    payload: data,
  };
};
export const listCateoryUserWiseSuccess = (data) => {
  return {
    type: CATEGORY_LIST_USER_WISE_SUCCESS,
    payload: data,
  };
};
export const listCateoryUserWiseFailed = (error) => {
  return {
    type: CATEGORY_LIST_USER_WISE_FAILED,
    payload: error,
  };
};
