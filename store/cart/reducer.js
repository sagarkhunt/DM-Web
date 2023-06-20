import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_TO_CART_FAILED,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CART_COUNT_FAILED,
  CART_COUNT_REQUEST,
  CART_COUNT_SUCCESS,
  LIST_CART_FAILED,
  LIST_CART_REQUEST,
  LIST_CART_SUCCESS,
  LIST_CHECKOUT_FAILED,
  LIST_CHECKOUT_REQUEST,
  LIST_CHECKOUT_SUCCESS,
} from "./actionTypes";

const initState = {
  cartListData: [],
  cartAddData: null,
  checkoutListData: null,
  loading: false,
  error: null,
  cartCountTotal:null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload;
    //cart list
    case LIST_CART_REQUEST:
      state = { ...state, loading: true };
      break;
    case LIST_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        cartListData: action?.payload,
      };
      break;

    /**cart count */
    case CART_COUNT_REQUEST:
      state = { ...state, loading: true };
      break;
    case CART_COUNT_SUCCESS:
      state = {
        ...state,
        loading: false,
        cartCountTotal: action?.payload,
      };
      break;
    case CART_COUNT_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    /**checkout lsit */
    case LIST_CHECKOUT_REQUEST:
      state = { ...state, loading: true };
      break;
    case LIST_CHECKOUT_SUCCESS:
      state = {
        ...state,
        loading: false,
        checkoutListData: action?.payload?.data,
      };
      break;
    case LIST_CHECKOUT_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    /**add to cart request */
    case ADD_TO_CART_REQUEST:
      state = { ...state, loading: true };
      break;
    case ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        cartAddData: action?.payload,
      };
      break;
    case ADD_TO_CART_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    default:
      break;
  }
  return state;
};
