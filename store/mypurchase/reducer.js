import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_RATING_FAILED,
  ADD_RATING_REQUEST,
  ADD_RATING_SUCCESS,
  MORE_PRODUCT_FAILED,
  MORE_PRODUCT_REQUEST,
  MORE_PRODUCT_SUCCESS,
  PURCHASE_LIST_FAILED,
  PURCHASE_LIST_REQUEST,
  PURCHASE_LIST_SUCCESS,
} from "./actionTypes";

const initState = {
  purchaselistdata: [],
  addRatingData: null,
  moreProductList:null,
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload;

    /**purchage list */
    case PURCHASE_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case PURCHASE_LIST_SUCCESS:
      state = { ...state, loading: true, purchaselistdata: action?.payload };
      break;
    case PURCHASE_LIST_FAILED:
      state = { ...state, loading: true, error: action?.payload };
      break;

    /**Add Rating */
    case ADD_RATING_REQUEST:
      state = { ...state, loading: true };
      break;
    case ADD_RATING_SUCCESS:
      state = { ...state, loading: true, addRatingData: action?.payload };
      break;
    case ADD_RATING_FAILED:
      state = { ...state, loading: true, error: action?.payload };
      break;

    /**More product love */
    case MORE_PRODUCT_REQUEST:
      state = { ...state, loading: true };
      break;
    case MORE_PRODUCT_SUCCESS:
      state = { ...state, loading: true, moreProductList: action?.payload };
      break;
    case MORE_PRODUCT_FAILED:
      state = { ...state, loading: true, error: action?.payload };
      break;

    default:
      break;
  }
  return state;
};
