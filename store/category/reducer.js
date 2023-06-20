import { HYDRATE } from "next-redux-wrapper";
import {
  CATEGORY_DETAILS_FAILED,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_LIST_FAILED,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_USER_WISE_FAILED,
  CATEGORY_LIST_USER_WISE_REQUEST,
  CATEGORY_LIST_USER_WISE_SUCCESS,
  CATEGORY_PRO_LIST_FAILED,
  CATEGORY_PRO_LIST_REQUEST,
  CATEGORY_PRO_LIST_SUCCESS,
  CATEGORY_SUB_LIST_FAILED,
  CATEGORY_SUB_LIST_REQUEST,
  CATEGORY_SUB_LIST_SUCCESS,
} from "./actionTypes";

const initState = {
  categoryListData: [],
  categorySubListData: [],
  categoryListUserWiseData: [],
  loading: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload;
    case CATEGORY_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case CATEGORY_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        categoryListData: action?.payload?.data,
      };
      break;
    case CATEGORY_SUB_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case CATEGORY_SUB_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case CATEGORY_SUB_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        categorySubListData: action?.payload?.data,
      };
      break;
    case CATEGORY_PRO_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case CATEGORY_PRO_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case CATEGORY_PRO_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        categoryProjectListData: action?.payload?.data,
      };
      break;
    case CATEGORY_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case CATEGORY_DETAILS_REQUEST:
      state = { ...state, loading: true };
      break;
    case CATEGORY_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        categoryDetailsData: action?.payload?.data,
      };
      break;
    case CATEGORY_DETAILS_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    case CATEGORY_LIST_USER_WISE_REQUEST:
      state = { ...state, loading: true };
      break;
    case CATEGORY_LIST_USER_WISE_SUCCESS:
      state = {
        ...state,
        loading: false,
        categoryListUserWiseData: action?.payload?.data,
      };
      break;
    case CATEGORY_LIST_USER_WISE_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    default:
      break;
  }
  return state;
};
