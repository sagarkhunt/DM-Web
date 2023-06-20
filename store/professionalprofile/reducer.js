import { HYDRATE } from "next-redux-wrapper";
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

const initState = {
  shopeListdData: null,
  follwFollowing: null,
  follwFollowingList: null,
  shopeOnerReviewListdData: null,
  error: null,
  loading: false,
  loadingFollow:false,
};

/** Signup reducer */
export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.auth;
    /**shop list */
    case SHOPE_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case SHOPE_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        shopeListdData: action.payload.data,
      };
      break;
    case SHOPE_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * follow and following create
     */
    case FOLLOW_FOLLOWING_CLEAR:
      state = { ...state, loadingFollow: false, follwFollowing : null};
      break;
    case FOLLOW_FOLLOWING_REQUEST:
      state = { ...state, loadingFollow: true };
      break;
    case FOLLOW_FOLLOWING_SUCCESS:
      state = {
        ...state,
        loadingFollow: false,
        follwFollowing: action.payload,
      };
      break;
    case FOLLOW_FOLLOWING_FAILED:
      state = { ...state, loadingFollow: false, error: action.payload };
      break;

    /**
     *  follow and following list
     */
    case FOLLOW_FOLLOWING_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case FOLLOW_FOLLOWING_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        follwFollowingList: action?.payload?.data,
      };
      break;
    case FOLLOW_FOLLOWING_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**shop oner reviews list */
    case SHOP_OWNER_REVIEW_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case SHOP_OWNER_REVIEW_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        shopeOnerReviewListdData: action?.payload?.data,
      };
      break;
    case SHOP_OWNER_REVIEW_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    default:
      break;
  }
  return state;
};
