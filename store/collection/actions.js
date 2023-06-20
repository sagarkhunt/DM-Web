import {
  LIST_COLLECTION_FAILED,
  LIST_COLLECTION_REQUEST,
  LIST_COLLECTION_SUCCESS,
  GET_COLLECTION_FAILED,
  GET_COLLECTION_REQUEST,
  GET_COLLECTION_SUCCESS,
  CREATE_COLLECTION_FAILED,
  CREATE_COLLECTION_REQUEST,
  CREATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_FAILED,
  UPDATE_COLLECTION_REQUEST,
  UPDATE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAILED,
  DELETE_COLLECTION_REQUEST,
  DELETE_COLLECTION_SUCCESS,
  ADD_TO_COLLECTION_FAILED,
  ADD_TO_COLLECTION_REQUEST,
  ADD_TO_COLLECTION_SUCCESS,
  CLEAR_STATE,
} from "./actionTypes";
/**
 * @param {*list collection } payload
 * @returns
 */
export const cleartState = (data) => {
  return {
    type: CLEAR_STATE,
  };
};
/**
 * @param {*list collection } payload
 * @returns
 */
export const listCollectionRequest = (data) => {
  return {
    type: LIST_COLLECTION_REQUEST,
    payload: data,
  };
};
export const listCollectionSuccess = (data) => {
  return {
    type: LIST_COLLECTION_SUCCESS,
    payload: data,
  };
};
export const listCollectionFailed = (error) => {
  return {
    type: LIST_COLLECTION_FAILED,
    payload: error,
  };
};

/**
 * @param {*get collection } payload
 * @returns
 */
export const getCollectionRequest = (data) => {
  return {
    type: GET_COLLECTION_REQUEST,
    payload: data,
  };
};
export const getCollectionSuccess = (data) => {
  return {
    type: GET_COLLECTION_SUCCESS,
    payload: data,
  };
};
export const getCollectionFailed = (error) => {
  return {
    type: GET_COLLECTION_FAILED,
    payload: error,
  };
};

/**
 * @param {*create collection } payload
 * @returns
 */
export const createCollectionRequest = (data) => {
  return {
    type: CREATE_COLLECTION_REQUEST,
    payload: data,
  };
};
export const createCollectionSuccess = (data) => {
  return {
    type: CREATE_COLLECTION_SUCCESS,
    payload: data,
  };
};
export const createCollectionFailed = (error) => {
  return {
    type: CREATE_COLLECTION_FAILED,
    payload: error,
  };
};

/**
 * @param {*update collection } payload
 * @returns
 */
export const updateCollectionRequest = (data) => {
  return {
    type: UPDATE_COLLECTION_REQUEST,
    payload: data,
  };
};
export const updateCollectionSuccess = (data) => {
  return {
    type: UPDATE_COLLECTION_SUCCESS,
    payload: data,
  };
};
export const updateCollectionFailed = (error) => {
  return {
    type: UPDATE_COLLECTION_FAILED,
    payload: error,
  };
};

/**
 * @param {*delete collection } payload
 * @returns
 */
export const deleteCollectionRequest = ({router,id}) => {
  return {
    type: DELETE_COLLECTION_REQUEST,
    payload: {router,id},
  };
};
export const deleteCollectionSuccess = (data) => {
  return {
    type: DELETE_COLLECTION_SUCCESS,
    payload: data,
  };
};
export const deleteCollectionFailed = (error) => {
  return {
    type: DELETE_COLLECTION_FAILED,
    payload: error,
  };
};

/**
 * @param {*add To collection } payload
 * @returns
 */
export const addToCollectionRequest = (data) => {
  return {
    type: ADD_TO_COLLECTION_REQUEST,
    payload: data,
  };
};
export const addToCollectionSuccess = (data) => {
  return {
    type: ADD_TO_COLLECTION_SUCCESS,
    payload: data,
  };
};
export const addToCollectionFailed = (error) => {
  return {
    type: ADD_TO_COLLECTION_FAILED,
    payload: error,
  };
};
