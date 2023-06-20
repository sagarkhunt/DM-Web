import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_TO_COLLECTION_FAILED,
  ADD_TO_COLLECTION_REQUEST,
  ADD_TO_COLLECTION_SUCCESS,
  CREATE_COLLECTION_FAILED,
  CREATE_COLLECTION_REQUEST,
  CREATE_COLLECTION_SUCCESS,
  LIST_COLLECTION_FAILED,
  LIST_COLLECTION_REQUEST,
  LIST_COLLECTION_SUCCESS,
  GET_COLLECTION_FAILED,
  GET_COLLECTION_REQUEST,
  GET_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_REQUEST,
  UPDATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_FAILED,
  DELETE_COLLECTION_REQUEST,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAILED,
  CLEAR_STATE,
} from "./actionTypes";

const initState = {
  collectionListData: [],
  getCollectionData: [],
  collectionCreateData: [],
  collectionDeleteData: [],
  collectionUpdateeData: [],
  collectionAddData: [],
  loading: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case CLEAR_STATE:
      state = {
        collectionDeleteData: [],
      };
      break;
    case HYDRATE:
      state = action.payload;
    case LIST_COLLECTION_REQUEST:
      state = { ...state, loading: true };
      break;
    case LIST_COLLECTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        collectionListData: action?.payload?.data,
      };
      break;
    case LIST_COLLECTION_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case GET_COLLECTION_REQUEST:
      state = { ...state, loading: true };
      break;
    case GET_COLLECTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        getCollectionData: action?.payload?.data,
      };
      break;
    case GET_COLLECTION_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case CREATE_COLLECTION_REQUEST:
      state = { ...state, loading: true};
      break;
    case CREATE_COLLECTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        collectionCreateData: action?.payload?.data,
      };
      break;
    case CREATE_COLLECTION_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case UPDATE_COLLECTION_REQUEST:
      state = { ...state, loading: true };
      break;
    case UPDATE_COLLECTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        collectionUpdateData: action?.payload?.data,
      };
      break;
    case UPDATE_COLLECTION_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case DELETE_COLLECTION_REQUEST:
      state = { ...state, loading: true };
      break;
    case DELETE_COLLECTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        collectionDeleteData: action?.payload,
      };
      break;
    case DELETE_COLLECTION_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case ADD_TO_COLLECTION_REQUEST:
      state = { ...state, loading: true };
      break;
    case ADD_TO_COLLECTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        collectionAddData: action?.payload,
      };
      break;
    case ADD_TO_COLLECTION_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    default:
      break;
  }
  return state;
};
