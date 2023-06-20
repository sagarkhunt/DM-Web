import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { call, put, takeLatest } from "redux-saga/effects";
import { axiosApi, get, post, putApi } from "../../utils/axios";
import {
  forgotPasswordFailed,
  forgotPasswordSuccess, loginFailed,
  loginSuccess, resetPasswordFailed, resetPasswordSuccess, roleUpdateFailed, roleUpdateSuccess, signUpFailed,
  signUpSuccess, socialLoginFailed,
  socialLoginSuccess, verifyEmailFailed, verifyEmailSuccess, verifyTokenFailed, verifyTokenSuccess
} from "./actions";
import {
  FORGOT_PASSWORD_REQUEST, LOGIN_REQUEST, RESET_PASSWORD_REQUEST, ROLE_UPDATE_REQUEST, SIGN_UP_REQUEST, SOCIAL_LOGIN_REQUEST, VERIFY_EMAIL_REQUEST, VERIFY_TOKEN_REQUEST
} from "./actionTypes";

/** sign up */
function* signUp({ payload: { data, router } }) {
  try {
    const response = yield call(post, "/auth/register", data);
    // Cookies.set("pics_idea_token", response.tokens.access.token);
    // Cookies.set("pics_userName", response.user.userName);
    // axiosApi.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${response.tokens.access.token}`;
    // toast.success(response.message);
    yield put(signUpSuccess(response));
    router.push({
      pathname: "/auth/login",
    });
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(signUpFailed(error));
  }
}

/**
 * Login action
 */
function* login({ payload: { data, router } }) {
  try {
    const response = yield call(post, "/auth/login", data);
    if (response) {
      localStorage.setItem("access", response?.tokens?.access?.token);
      // Cookies.set("token", response?.tokens?.access?.token);
      Cookies.set("token", response?.tokens?.access?.token, { expires: 365 });
      localStorage.setItem("userID", response?.data?._id);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("isAuthentication", true);
      localStorage.setItem("isProfessional", response?.data?.is_professional);
      localStorage.setItem("user_image", response?.data?.profile_image_path);
      localStorage.setItem("userName", response?.data?.name);
      localStorage.setItem(
        "userPerData",
        JSON.stringify(response?.data?.accesspermissions)
      );
      axiosApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.tokens?.access?.token}`;
      // toast.success(response.message);
      yield put(loginSuccess(response));
      router.push({
        pathname: "/",
      });
    }
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(loginFailed(error));
  }
}
/**
 * Verify Token
 */
function* verifyToken() {
  try {
    const response = yield call(get, "/users/verify-token");
    // localStorage.setItem("access", response?.tokens?.access?.token);
    localStorage.setItem("userID", response?.data?._id);
    localStorage.setItem("email", response?.data?.email);
    localStorage.setItem("isProfessional", response?.data?.is_professional);
    localStorage.setItem("user_image", response?.data?.profile_image_path);
    localStorage.setItem("userName", response?.data?.name);
    yield put(verifyTokenSuccess(response));
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(verifyTokenFailed(error));
  }
}

/**switch to professional */
function* userRoleUpdate() {
  try {
    const response = yield call(putApi, "/users/switch-professional");
    localStorage.setItem("userID", response?.data?._id);
    localStorage.setItem("email", response?.data?.email);
    localStorage.setItem("isProfessional", response?.data?.is_professional);
    localStorage.setItem("user_image", response?.data?.profile_image_path);
    localStorage.setItem("userName", response?.data?.name);
    // toast.success(response.message);
    yield put(roleUpdateSuccess(response));
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(roleUpdateFailed(error));
  }
}
/**
 * Social Login
 */
function* socialLogin({ payload: { data, router } }) {
  try {
    const response = yield call(post, "/auth/sign-in", data);
    if (response) {
      localStorage.setItem("access", response?.tokens?.access?.token);
      Cookies.set("token", response?.tokens?.access?.token);
      localStorage.setItem("userID", response?.data?._id);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("isAuthentication", true);
      localStorage.setItem("isProfessional", response?.data?.is_professional);
      localStorage.setItem("user_image", response?.data?.profile_image_path);
      localStorage.setItem("userName", response?.data?.name);
      localStorage.setItem(
        "userPerData",
        JSON.stringify(response?.data?.accesspermissions)
      );
      axiosApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response?.tokens?.access?.token}`;
      // toast.success(response.message);
      yield put(socialLoginSuccess(response));
      router.push({
        pathname: "/",
      });
    }
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(socialLoginFailed(error));
  }
}

/**
 * forgot passwrod
 */
function* forgotPassword({ payload: { data, router } }) {
  try {
    const response = yield call(post, "/auth/forgot-password", data);
    if (response) {
      toast.success(response.message);
      yield put(forgotPasswordSuccess(response));
      router.push({
        pathname: "/auth/forgot-password",
      });
    }
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(forgotPasswordFailed(error));
  }
}


/**
 * Reset passwrod
 */
function* resetPassword({ payload: { data, router } }) {
  try {
    const response = yield call(post, "/auth/reset-password", data);
    if (response) {
      // toast.success(response.message);
      yield put(resetPasswordSuccess(response));
      router.push({
        pathname: "/auth/login",
      });
    }
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(resetPasswordFailed(error));
  }
}

/**
 * Verify email
 */
function* verifyEmail({ payload: { data, router } }) {
  try {
    const response = yield call(post, "/auth/verify-email", data);
      // toast.success(response.message);
      yield put(verifyEmailSuccess(response));
      // router.push({
      //   pathname: "/auth/login",
      // });
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    yield put(verifyEmailFailed(error));
  }
}





function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(VERIFY_TOKEN_REQUEST, verifyToken);
  yield takeLatest(ROLE_UPDATE_REQUEST, userRoleUpdate);
  yield takeLatest(SOCIAL_LOGIN_REQUEST, socialLogin);
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPassword);
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPassword);
  yield takeLatest(VERIFY_EMAIL_REQUEST, verifyEmail);
}

export default authSaga;
