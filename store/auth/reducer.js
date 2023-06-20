import { HYDRATE } from "next-redux-wrapper";
import {
  SIGN_UP_FAILED,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILED,
  ROLE_UPDATE_REQUEST,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_FAILED,
  SOCIAL_LOGIN_REQUEST,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_FAILED,
  VERIFY_EMAIL_SUCCESS,
} from "./actionTypes";

const initState = {
  signUpData: null,
  loginData: null,
  verifyTokenData: null,
  roleUpdateData: null,
  forgotPassData: null,
  resetPassData: null,
  socialLoginData: null,
  emailVerifyState: null,
  loading: false,
  error: null,
  signInPopUpActive: false,
};

/** Signup reducer */
export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload.auth;
    case SIGN_UP_REQUEST:
      state = { ...state, loading: true };
      break;
    case SIGN_UP_SUCCESS:
      state = {
        ...state,
        loading: false,
        signUpData: action.payload.data,
      };
      break;
    case SIGN_UP_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**Lgin reducer */
    case LOGIN_REQUEST:
      state = { ...state, loading: true };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        loginData: action.payload.data,
      };
      break;
    case LOGIN_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * Verify token reducer
     */
    case VERIFY_TOKEN_REQUEST:
      state = { ...state, loading: true };
      break;
    case VERIFY_TOKEN_SUCCESS:
      state = {
        ...state,
        loading: false,
        verifyTokenData: action.payload.data,
      };
      break;
    case VERIFY_TOKEN_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * role update state
     */
    case ROLE_UPDATE_REQUEST:
      state = { ...state, loading: true };
      break;
    case ROLE_UPDATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        roleUpdateData: action.payload,
      };
      break;
    case ROLE_UPDATE_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * social login
     */
    case SOCIAL_LOGIN_REQUEST:
      state = { ...state, loading: true };
      break;
    case SOCIAL_LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        socialLoginData: action.payload.data,
      };
      break;
    case SOCIAL_LOGIN_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * FORGOT_PASSWORD
     */
    case FORGOT_PASSWORD_REQUEST:
      state = { ...state, loading: true };
      break;
    case FORGOT_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        forgotPassData: action.payload.data,
      };
      break;
    case FORGOT_PASSWORD_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * reset password
     */
    case RESET_PASSWORD_REQUEST:
      state = { ...state, loading: true };
      break;
    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        resetPassData: action.payload.data,
      };
      break;
    case RESET_PASSWORD_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * Verify email
     */
    case VERIFY_EMAIL_REQUEST:
      state = { ...state, loading: true };
      break;
    case VERIFY_EMAIL_SUCCESS:
      state = {
        ...state,
        loading: false,
        emailVerifyState: action.payload,
      };
      break;
    case VERIFY_EMAIL_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    default:
      break;
  }
  return state;
};
