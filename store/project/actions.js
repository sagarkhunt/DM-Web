import { data } from "autoprefixer";
import {
  LIST_PROJECT_FAILED,
  LIST_PROJECT_REQUEST,
  LIST_PROJECT_SUCCESS,
  LIST_FAV_PROJECT_FAILED,
  LIST_FAV_PROJECT_REQUEST,
  LIST_FAV_PROJECT_SUCCESS,
  PROJECT_DETAILS_FAILED,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  FAV_PROJECT_FAILED,
  FAV_PROJECT_REQUEST,
  FAV_PROJECT_SUCCESS,
  SEND_MESSAGE_TO_OWNER_FAILED,
  SEND_MESSAGE_TO_OWNER_REQUEST,
  SEND_MESSAGE_TO_OWNER_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILED,
  REVIEWS_LIST_REQUEST,
  REVIEWS_LIST_SUCCESS,
  REVIEWS_LIST_FAILED,
  ADD_FAQS_REQUEST,
  ADD_FAQS_SUCCESS,
  ADD_FAQS_FAILED,
  LIST_FAQS_REQUEST,
  LIST_FAQS_SUCCESS,
  LIST_FAQS_FAILED,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_FAILED,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_FAILED,
  COMMENT_EDIT_REQUEST,
  COMMENT_EDIT_SUCCESS,
  COMMENT_EDIT_FAILED,
  FILEPREVIEW_LIST_REQUEST,
  FILEPREVIEW_LIST_SUCCESS,
  FILEPREVIEW_LIST_FAILED,
  SEARCH_VALUES,
  SEARCH_DROPDOWN_VALUES
} from "./actionTypes";
export const valueSearch = (data) => {
  return {
    type: SEARCH_VALUES,
    payload:data
  }
}

export const dropdownValueSearch = (data)=>{
  return{
    type:SEARCH_DROPDOWN_VALUES,
    payload:data
  }
}
/**
 * @param {*get projects } payload
 * @returns
 */
export const listProjectRequest = (data) => {
  return {
    type: LIST_PROJECT_REQUEST,
    payload: data,
  };
};
export const listProjectSuccess = (data) => {
  return {
    type: LIST_PROJECT_SUCCESS,
    payload: data,
  };
};
export const listProjectFailed = (error) => {
  return {
    type: LIST_PROJECT_FAILED,
    payload: error,
  };
};

/**
 * @param {*get favourite projects } payload
 * @returns
 */
export const listFavProjectRequest = (data) => {
  return {
    type: LIST_FAV_PROJECT_REQUEST,
    payload: data,
  };
};
export const listFavProjectSuccess = (data) => {
  return {
    type: LIST_FAV_PROJECT_SUCCESS,
    payload: data,
  };
};
export const listFavProjectFailed = (error) => {
  return {
    type: LIST_FAV_PROJECT_FAILED,
    payload: error,
  };
};

/**
 * @param {* get project} _id
 */

export const projectDetailsRequest = ({ data }) => {
  return {
    type: PROJECT_DETAILS_REQUEST,
    payload: { data },
  };
};
export const projectDetailsSuccess = (data) => {
  return {
    type: PROJECT_DETAILS_SUCCESS,
    payload: data,
  };
};
export const projectDetailsFailed = (error) => {
  return {
    type: PROJECT_DETAILS_FAILED,
    payload: error,
  };
};

/**
 * @param {*get projects } payload
 * @returns
 */
export const favProjectRequest = (data) => {
  return {
    type: FAV_PROJECT_REQUEST,
    payload: data,
  };
};
export const favProjectSuccess = (data) => {
  return {
    type: FAV_PROJECT_SUCCESS,
    payload: data,
  };
};
export const favProjectFailed = (error) => {
  return {
    type: FAV_PROJECT_FAILED,
    payload: error,
  };
};

/**
 * @param {*get projects } payload
 * @returns
 */
export const sendMessageToOwnerRequest = (data) => {
  return {
    type: SEND_MESSAGE_TO_OWNER_REQUEST,
    payload: data,
  };
};
export const sendMessageToOwnerSuccess = (data) => {
  return {
    type: SEND_MESSAGE_TO_OWNER_SUCCESS,
    payload: data,
  };
};
export const sendMessageToOwnerFailed = (error) => {
  return {
    type: SEND_MESSAGE_TO_OWNER_FAILED,
    payload: error,
  };
};

/**
 * @param {*list reviews} payload
 * @returns
 */
export const reviewsListRequest = ({ data, projectId }) => {
  return {
    type: REVIEWS_LIST_REQUEST,
    payload: { data, projectId },
  };
};
export const reviewsListSuccess = (data) => {
  return {
    type: REVIEWS_LIST_SUCCESS,
    payload: data,
  };
};
export const reviewsListFailed = (error) => {
  return {
    type: REVIEWS_LIST_FAILED,
    payload: error,
  };
};

/**
 * @param {*add comment} payload
 * @returns
 */

export const addCommentRequest = ({ data,projectId }) => {
  return {
    type: ADD_COMMENT_REQUEST,
    payload: { data,projectId },
  };
};
export const addCommentSuccess = (data) => {
  return {
    type: ADD_COMMENT_SUCCESS,
    payload: data,
  };
};
export const addCommentfailed = (error) => {
  return {
    type: ADD_COMMENT_FAILED,
    payload: error,
  };
};
/**
 * 
 * @param {commentListRequest} data 
 * @returns 
 */
export const commentListRequest = (data,projectId) => {
  return {
    type: COMMENT_LIST_REQUEST,
    payload:data,projectId
  }
}
export const commentListSuccess = (data) => {
  return {
    type: COMMENT_LIST_SUCCESS,
    payload: data,
  };
};
export const commentListFailed = (error) => {
  return {
    type: COMMENT_LIST_FAILED,
    payload: error,
  };
};
/**
 * 
 * @param {editCommentRequest} commentId 
 * @returns 
 */
export const editCommentRequest =({commentsId , data} )=>{
  return{
    type:COMMENT_EDIT_REQUEST,
    payload:{commentsId , data},
  };
};
export const editCommentSuccess = (data)=>{
  return{
    type:COMMENT_EDIT_SUCCESS,
    payload:data
  };
};
export const editCommentFailed =(error)=>{
  return{
    type:COMMENT_EDIT_FAILED,
    payload:error
  }
}

/**
 * 
 * @param {deleteCommentRequest} commentId 
 * @returns 
 */
export const deleteCommentRequest = ({ commentId }) => {
  return {
    type: COMMENT_DELETE_REQUEST,
    payload: { commentId },
  };
};
export const deleteCommentSuccess = (data) => {
  return {
    type: COMMENT_DELETE_SUCCESS,
    payload: data,
  };
};
export const deleteCommentfailed = (error) => {
  return {
    type: COMMENT_DELETE_FAILED,
    payload: error,
  };
};

/**
 * @param {*add Faqs} payload
 * @returns
 */
export const addFaqsRequest = ({ data }) => {
  return {
    type: ADD_FAQS_REQUEST,
    payload: { data },
  };
};
export const addFaqsSuccess = (data) => {
  return {
    type: ADD_FAQS_SUCCESS,
    payload: data,
  };
};
export const addFaqsFailed = (error) => {
  return {
    type: ADD_FAQS_FAILED,
    payload: error,
  };
};

/**
 * @param {*List Faqs} payload
 * @returns
 */
export const listFaqsRequest = ({ data }) => {
  return {
    type: LIST_FAQS_REQUEST,
    payload: { data },
  };
};
export const listFaqsSuccess = (data) => {
  return {
    type: LIST_FAQS_SUCCESS,
    payload: data,
  };
};
export const listFaqsFailed = (error) => {
  return {
    type: LIST_FAQS_FAILED,
    payload: error,
  };
};
/**
 * 
 * @param {filePreviewList} param0 
 * @returns 
 */
export const filePreviewRequest = ({ projectId }) => {
  return {
    type: FILEPREVIEW_LIST_REQUEST,
    payload: { projectId },
  };
};
export const filePreviewSuccess = (data) => {
  return {
    type: FILEPREVIEW_LIST_SUCCESS,
    payload: data,
  };
};
export const filePreviewFailed = (error) => {
  return {
    type: FILEPREVIEW_LIST_FAILED,
    payload: error,
  };
};
