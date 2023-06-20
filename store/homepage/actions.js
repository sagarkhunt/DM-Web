import {
  PROJECT_LIST_FAILED,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS
} from "./actionTypes";



/**
 * @param {*getprojectList} payload
 * @returns
 */
export const getProjectListRequest = () => {
  return {
    type: PROJECT_LIST_REQUEST,
  }
};
export const getProjectListSuccess = (data) => {
  return {
    type: PROJECT_LIST_SUCCESS,
    payload: data
  }
};

export const getProjectListFailed = (error) => {
  return {
    type: PROJECT_LIST_FAILED,
    payload:error
  }
}