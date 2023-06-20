const { putFormData, putApi, del, get } = require("@/utils/axios");
import toast from "react-hot-toast";
const { call, takeLatest, put } = require("redux-saga/effects");
const {
  profileImageFailed,
  profileImageSuccess,
  updateProfileSuccess,
  updateProfileFailed,
  profileImageDeleteSuccess,
  profileImageDeleteFailed,
  changePasswordSuccess,
  changePasswordFailed,
  profileDetailsSuccess,
  profileDetailsFailed,
  accountDeactiveSuccess,
  accountDeactiveFailed,
  getProfessionSuccess,
  getProfessionFailed,
} = require("./actions");
const {
  PROFILE_IMAGE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  PROFILE_IMAGE_DELETE_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  PROFILE_DETAILS_REQUEST,
  ACCOUNT_DEACTIVE_REQUEST,
  GET_PROFESSION_REQUEST,
} = require("./actionTypes");
/**
 * User Profile image update
 */

function* profileImageUpdate({ payload: { data } }) {
  try {
    const response = yield call(putFormData, "/users//update-profile-picture", data);
    yield put(profileImageSuccess(response));
  } catch (error) {
    yield put(profileImageFailed(error));
  }
}

/**
 * User Profile Image Delete
 */

function* profileImageDelete() {
  try {
    const response = yield call(del, "/users/delete-profile-picture");
    yield put(profileImageDeleteSuccess(response));
  } catch (error) {
    yield put(profileImageDeleteFailed(error));
  }
}

/**
 * user profile upadate
 */
function* updateProfiles({ payload: { data } }) {
  try {
    const response = yield call(putApi, "/users", data);
    yield put(updateProfileSuccess(response));
  } catch (error) {
    yield put(updateProfileFailed(error));
  }
}

/**
 * change password
 */

function* passwordChange({ payload: { data } }) {
  try {
    const response = yield call(putApi, "/users/change-password", data);
    yield put(changePasswordSuccess(response));
  } catch (error) {
    yield put(changePasswordFailed(error));
  }
}

/**
 * Get use profile details
 */
function* getUserProfileDetails() {
  try {
    const response = yield call(get, "/users/user-details");
    yield put(profileDetailsSuccess(response));
  } catch (error) {
    yield put(profileDetailsFailed(error));
  }
}
/***
 * account deactive
 */
function* accountDeactive() {
  try {
    const response = yield call(putApi, "/users/deactivate");
    Cookies.remove("token");
    localStorage.clear();
    yield put(accountDeactiveSuccess(response));
  } catch (error) {
    yield put(accountDeactiveFailed(error));
  }
}

/* Profession list api */
function* professionList({ payload: data }) {
  try {
    const response = yield call(get, `/profession?search=${data?.search}`);
    yield put(getProfessionSuccess(response));
  } catch (error) {
    yield put(getProfessionFailed(error));
  }
}

function* userSaga() {
  yield takeLatest(PROFILE_IMAGE_REQUEST, profileImageUpdate);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfiles);
  yield takeLatest(PROFILE_IMAGE_DELETE_REQUEST, profileImageDelete);
  yield takeLatest(CHANGE_PASSWORD_REQUEST, passwordChange);
  yield takeLatest(PROFILE_DETAILS_REQUEST, getUserProfileDetails);
  yield takeLatest(ACCOUNT_DEACTIVE_REQUEST, accountDeactive);
  yield takeLatest(GET_PROFESSION_REQUEST, professionList);
}

export default userSaga;
