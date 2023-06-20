import { HYDRATE } from "next-redux-wrapper";
import {
  ACCOUNT_DEACTIVE_FAILED,
  ACCOUNT_DEACTIVE_REQUEST,
  ACCOUNT_DEACTIVE_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  GET_PROFESSION_REQUEST,
  GET_PROFESSION_SUCCESS,
  LAZY_LOADING_PAGE_REQUEST,
  PROFILE_DETAILS_FAILED,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_IMAGE_DELETE_FAILED,
  PROFILE_IMAGE_DELETE_REQUEST,
  PROFILE_IMAGE_DELETE_SUCCESS,
  PROFILE_IMAGE_FAILED,
  PROFILE_IMAGE_REQUEST,
  PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_FAILED,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS
} from "./actionTypes";
import { GET_COLLECTION_FAILED } from "../collection/actionTypes";

const initState = {
  profileImageUpdate: null,
  profileImageDelete: null,
  changePassword: null,
  userProfileDetails: null,
  professionListData: null,
  accountDeactive: null,
  loading: false,
  loadingDel: false,
  error: null,
  lazyPageLoading: false,
};
export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.user;

    /**
     * lazyLoadingPageRequest
     */
    case LAZY_LOADING_PAGE_REQUEST:
      const { loading } = action.payload;
      state = {
        ...state,
        lazyPageLoading: loading,
      };
      break;

    /**
     * profile image update
     */
    case PROFILE_IMAGE_REQUEST:
      state = { ...state, loading: true };
      break;
    case PROFILE_IMAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        profileImageUpdate: action.payload,
      };
      break;
    case PROFILE_IMAGE_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * profile image delete
     */
    case PROFILE_IMAGE_DELETE_REQUEST:
      state = { ...state, loadingDel: true };
      break;
    case PROFILE_IMAGE_DELETE_SUCCESS:
      state = {
        ...state,
        loadingDel: false,
        profileImageDelete: action.payload,
      };
      break;
    case PROFILE_IMAGE_DELETE_FAILED:
      state = { ...state, loadingDel: false, error: action.payload };
      break;

    // /**
    //  * user profile update
    //  */
    case UPDATE_PROFILE_REQUEST:
      state = { ...state, loading: true };
      break;
    case UPDATE_PROFILE_SUCCESS:
      state = {
        ...state,
        loading: false,
        profileUpdate: action.payload.data,
      };
      break;
    case UPDATE_PROFILE_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /** change password */
    case CHANGE_PASSWORD_REQUEST:
      state = { ...state, loading: true };
      break;
    case CHANGE_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        changePassword: action.payload,
      };
      break;
    case CHANGE_PASSWORD_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**get user profile */

    case PROFILE_DETAILS_REQUEST:
      state = { ...state, loading: true };
      break;
    case PROFILE_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        userProfileDetails: action.payload.data,
      };
      break;
    case PROFILE_DETAILS_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * Account Deactive
     */

    case ACCOUNT_DEACTIVE_REQUEST:
      state = { ...state, loading: true };
      break;
    case ACCOUNT_DEACTIVE_SUCCESS:
      state = {
        ...state,
        loading: false,
        accountDeactive: action.payload,
      };
      break;
    case ACCOUNT_DEACTIVE_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**profession list */
    case GET_PROFESSION_REQUEST:
      state = { ...state, loading: true };
      break;
    case GET_PROFESSION_SUCCESS:
      state = {
        ...state,
        loading: false,
        professionListData: action?.payload?.data?.results,
      };
      break;
    case GET_COLLECTION_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    default:
      break;
  }
  return state;
};
