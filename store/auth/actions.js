import {
  SIGN_UP_FAILED,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  VERIFY_TOKEN_REQUEST,
  VERIFY_TOKEN_SUCCESS,
  VERIFY_TOKEN_FAILED,
  ROLE_UPDATE_REQUEST,
  ROLE_UPDATE_SUCCESS,
  ROLE_UPDATE_FAILED,
  SOCIAL_LOGIN_FAILED,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_REQUEST,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILED,
} from "./actionTypes";

/**
 * Sign up
 */

export const signUpRequest = ({ data, router }) => {
  return {
    type: SIGN_UP_REQUEST,
    payload: { data, router },
  };
};
export const signUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data,
  };
};
export const signUpFailed = (error) => {
  return {
    type: SIGN_UP_FAILED,
    payload: error,
  };
};

/**
 * Login action
 */

export const loginRequest = ({ data, router }) => {
  return {
    type: LOGIN_REQUEST,
    payload: { data, router },
  };
};
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};
export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
};

/**
 * Verify token action
 */

export const verifyTokenRequest = () => ({
  type: VERIFY_TOKEN_REQUEST,
});
export const verifyTokenSuccess = (data) => ({
  type: VERIFY_TOKEN_SUCCESS,
  payload: data,
});
export const verifyTokenFailed = (error) => ({
  type: VERIFY_TOKEN_FAILED,
  payload: error,
});

/**
 * change role
 */

export const roleUpdateRequest = () => ({
  type: ROLE_UPDATE_REQUEST,
  // payload: { router },
});
export const roleUpdateSuccess = (data) => ({
  type: ROLE_UPDATE_SUCCESS,
  payload: data,
});
export const roleUpdateFailed = (error) => ({
  type: ROLE_UPDATE_FAILED,
  payload: error,
});

/**
 * social login action
 */

export const socialLoginRequest = ({ data, router }) => ({
  type: SOCIAL_LOGIN_REQUEST,
  payload: { data, router },
});
export const socialLoginSuccess = (data) => ({
  type: SOCIAL_LOGIN_SUCCESS,
  payload: data,
});
export const socialLoginFailed = (error) => ({
  type: SOCIAL_LOGIN_FAILED,
  payload: error,
});

/**
 * Forgot password
 */
export const forgotPasswordRequest = ({ data, router }) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload: { data, router },
});
export const forgotPasswordSuccess = (data) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: data,
});
export const forgotPasswordFailed = (error) => ({
  type: FORGOT_PASSWORD_FAILED,
  payload: error,
});


/**
 * Reset password
 */
export const resetPasswordRequest = ({ data, router }) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: { data, router },
});
export const resetPasswordSuccess = (data) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});
export const resetPasswordFailed = (error) => ({
  type: RESET_PASSWORD_FAILED,
  payload: error,
});

/**
 * Verify email
 */

export const verifyEmailRequest = ({ data, router }) => ({
  type: VERIFY_EMAIL_REQUEST,
  payload: { data, router }
});
export const verifyEmailSuccess = (data) => ({
  type: VERIFY_EMAIL_SUCCESS,
  payload: data,
});
export const verifyEmailFailed = (error) => ({
  type: VERIFY_EMAIL_FAILED,
  payload: error,
});
