/**
 * Professional shope list
 */

import {
  FOLLOW_FOLLOWING_CLEAR,
  FOLLOW_FOLLOWING_FAILED,
  FOLLOW_FOLLOWING_LIST_FAILED,
  FOLLOW_FOLLOWING_LIST_REQUEST,
  FOLLOW_FOLLOWING_LIST_SUCCESS,
  FOLLOW_FOLLOWING_REQUEST,
  FOLLOW_FOLLOWING_SUCCESS,
  SHOPE_LIST_FAILED,
  SHOPE_LIST_REQUEST,
  SHOPE_LIST_SUCCESS,
  SHOP_OWNER_REVIEW_LIST_FAILED,
  SHOP_OWNER_REVIEW_LIST_REQUEST,
  SHOP_OWNER_REVIEW_LIST_SUCCESS
} from "./actionTypes";

export const shopeListRequest = ({ body, id }) => {
  return {
    type: SHOPE_LIST_REQUEST,
    payload: { body, id },
  };
};
export const shopeListSuccess = (data) => {
  return {
    type: SHOPE_LIST_SUCCESS,
    payload: data,
  };
};
export const shopeListFailed = (error) => {
  return {
    type: SHOPE_LIST_FAILED,
    payload: error,
  };
};

/**
 * FOLLOW FOLLOWING
 */

export const followFollowingRequest = ({ id }) => ({
  type: FOLLOW_FOLLOWING_REQUEST,
  payload: { id },
});
export const followFollowingClear = () => ({
  type: FOLLOW_FOLLOWING_CLEAR,
  payload: null,
});
export const followFollowingSuccess = (data) => ({
  type: FOLLOW_FOLLOWING_SUCCESS,
  payload: data,
});
export const followFollowingFailed = (error) => ({
  type: FOLLOW_FOLLOWING_FAILED,
  payload: error,
});

/**
 * FOLLOW FOLLOWING LIST
 */

export const followFollowingListRequest = ({ body, id }) => ({
  type: FOLLOW_FOLLOWING_LIST_REQUEST,
  payload: { body, id },
});
export const followFollowingListSuccess = (data) => ({
  type: FOLLOW_FOLLOWING_LIST_SUCCESS,
  payload: data,
});
export const followFollowingListFailed = (error) => ({
  type: FOLLOW_FOLLOWING_LIST_FAILED,
  payload: error,
});
/**
 * 
 * @param {shopeOnerReviewListRequest} param0 
 * @returns 
 */
export const shopeOwnerReviewListRequest = ({ body, id }) => {
  return {
    type: SHOP_OWNER_REVIEW_LIST_REQUEST,
    payload: { body, id },
  };
};
export const shopeOwnerReviewSuccess = (data) => {
  return {
    type: SHOP_OWNER_REVIEW_LIST_SUCCESS,
    payload: data,
  };
};
export const shopeOwnerReviewFailed = (error) => {
  return {
    type: SHOP_OWNER_REVIEW_LIST_FAILED,
    payload: error,
  };
};
