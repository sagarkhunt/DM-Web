import { HYDRATE } from "next-redux-wrapper";
import {
  GET_HOMEPAGE_FAILED,
  GET_HOMEPAGE_REQUEST,
  GET_HOMEPAGE_SUCCESS,
  PROJECT_LIST_FAILED,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
} from "./actionTypes";

const initState = {
  //   dashboardSearchData: null,
  homePageDataList: [],
  projectListData: [],
  loading: false,
  error: null,
  totalResult: null,
  totalProjectResult: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.homepage;

    /**
     * project list by category
     */

    case PROJECT_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case PROJECT_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        projectListData: action.payload.data,
      };
      break;
    case PROJECT_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    default:
      break;
  }
  return state;
};
