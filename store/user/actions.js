import {
  ACCOUNT_DEACTIVE_FAILED,
  ACCOUNT_DEACTIVE_REQUEST,
  ACCOUNT_DEACTIVE_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  GET_PROFESSION_FAILED,
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
  UPDATE_PROFILE_SUCCESS,
} from "./actionTypes";

export const lazyLoadingPageRequest = (payload) => {
  return {
    type: LAZY_LOADING_PAGE_REQUEST,
    payload,
  };
};

/**
 * USer Profile image update
 */

export const profileImageRequest = ({ data }) => {
  return {
    type: PROFILE_IMAGE_REQUEST,
    payload: { data },
  };
};
export const profileImageSuccess = (data) => {
  return {
    type: PROFILE_IMAGE_SUCCESS,
    payload: data,
  };
};
export const profileImageFailed = (error) => {
  return {
    type: PROFILE_IMAGE_FAILED,
    payload: error,
  };
};

/**
 * 
 * @param {image delete} data 
 * @returns 
 */

export const profileImageDeleteRequest = () => {
  return {
    type: PROFILE_IMAGE_DELETE_REQUEST,
    // payload: { data },
  };
};
export const profileImageDeleteSuccess = (data) => {
  return {
    type: PROFILE_IMAGE_DELETE_SUCCESS,
    payload: data,
  };
};
export const profileImageDeleteFailed = (error) => {
  return {
    type: PROFILE_IMAGE_DELETE_FAILED,
    payload: error,
  };
};
// /**
//  *
//  * @param {updateProfileRequest} data
//  * @returns
//  */
export const updateProfileRequest = ({ data }) => {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: { data },
  };
};
export const updateProfileSuccess = ({ data }) => {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};
export const updateProfileFailed = (error) => {
  return {
    type: UPDATE_PROFILE_FAILED,
    payload: error,
  };
};

/**
 * @param { changePassword},data
 * @returns
 */

export const changePasswordRequest = ({ data }) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    payload: { data },
  };
};
export const changePasswordSuccess = ({ data }) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data,
  };
};
export const changePasswordFailed = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILED,
    payload: error,
  };
  
};
/***
 * @param {getUserProfileDetails}
 */

export const profileDetailsRequest = () => {
  return {
    type: PROFILE_DETAILS_REQUEST,
    // payload: { data },
  };
};
export const profileDetailsSuccess = ( data) => {
  return {
    type: PROFILE_DETAILS_SUCCESS,
    payload: data,
  };
};
export const profileDetailsFailed = (error) => {
  return {
    type: PROFILE_DETAILS_FAILED,
    payload: error,
  };
};

/**
 * user account deactive
 */
export const accountDeactiveRequest = () => {
  return {
    type: ACCOUNT_DEACTIVE_REQUEST,
    // payload: { data },
  };
};
export const accountDeactiveSuccess = (data) => {
  return {
    type: ACCOUNT_DEACTIVE_SUCCESS,
    payload: data,
  };
};
export const accountDeactiveFailed = (error) => {
  return {
    type: ACCOUNT_DEACTIVE_FAILED,
    payload: error,
  };
};

/**
 * @param {*get profession } payload
 * @returns
 */
export const getProfessionRequest = (data) => {
  return {
    type: GET_PROFESSION_REQUEST,
    payload: data,
  };
};
export const getProfessionSuccess = (data) => {
  return {
    type: GET_PROFESSION_SUCCESS,
    payload: data,
  };
};
export const getProfessionFailed = (error) => {
  return {
    type: GET_PROFESSION_FAILED,
    payload: error,
  };
};