import { HYDRATE } from "next-redux-wrapper";
import {
  ADD_COMMENT_FAILED,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_FAQS_FAILED,
  ADD_FAQS_REQUEST,
  ADD_FAQS_SUCCESS,
  COMMENT_DELETE_FAILED,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_EDIT_FAILED,
  COMMENT_EDIT_REQUEST,
  COMMENT_EDIT_SUCCESS,
  COMMENT_LIST_FAILED,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
  FAV_PROJECT_FAILED,
  FAV_PROJECT_REQUEST,
  FAV_PROJECT_SUCCESS,
  FILEPREVIEW_LIST_FAILED,
  FILEPREVIEW_LIST_REQUEST,
  FILEPREVIEW_LIST_SUCCESS,
  LIST_FAQS_FAILED,
  LIST_FAQS_REQUEST,
  LIST_FAQS_SUCCESS,
  LIST_FAV_PROJECT_FAILED,
  LIST_FAV_PROJECT_REQUEST,
  LIST_FAV_PROJECT_SUCCESS,
  LIST_PROJECT_FAILED,
  LIST_PROJECT_REQUEST,
  LIST_PROJECT_SUCCESS,
  PROJECT_DETAILS_FAILED,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  REVIEWS_LIST_FAILED,
  REVIEWS_LIST_REQUEST,
  REVIEWS_LIST_SUCCESS,
  SEARCH_DROPDOWN_VALUES,
  SEARCH_VALUES,
  SEND_MESSAGE_TO_OWNER_FAILED,
  SEND_MESSAGE_TO_OWNER_REQUEST,
  SEND_MESSAGE_TO_OWNER_SUCCESS,

} from "./actionTypes";

const initState = {
  projectListData: [],
  favProjectListData: [],
  projectDetailsData: null,
  sendMessageData: {},
  addCommentData: null,
  editCommentData: null,
  reviewsListData: null,
  addFaqsData: null,
  listFaqsData: [],
  projectFavData: null,
  commentListData: null,
  listFilePreviewData: null,
  loading: false,
  error: null,
  searchValue: '',
  searchDropdownValue: {value: '', label: 'All Items'}
};
export default (state = initState, action) => {
  switch (action.type) {
    case HYDRATE:
      state = action.payload;
    case SEARCH_VALUES:
      state = { ...state, searchValue: action?.payload };
    case SEARCH_DROPDOWN_VALUES:
      state = { ...state, searchDropdownValue: action?.payload };
      break;
    /**project list */
    case LIST_PROJECT_REQUEST:
      state = { ...state, loading: true };
      break;
    case LIST_PROJECT_SUCCESS:
      state = {
        ...state,
        loading: false,
        projectListData: action?.payload?.data,
      };
      break;
    case LIST_PROJECT_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    /**fav project list */
    case LIST_FAV_PROJECT_REQUEST:
      state = { ...state, loading: true };
      break;
    case LIST_FAV_PROJECT_SUCCESS:
      state = {
        ...state,
        loading: false,
        favProjectListData: action?.payload?.data,
      };
      break;
    case LIST_FAV_PROJECT_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**get single project details */
    case PROJECT_DETAILS_REQUEST:
      state = { ...state, loading: true, projectDetailsData: null };
      break;
    case PROJECT_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        projectDetailsData: action?.payload?.data,
      };
      break;
    case PROJECT_DETAILS_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case FAV_PROJECT_REQUEST:
      // projectFavData: null
      state = { ...state, loading: false };
      break;
    case FAV_PROJECT_SUCCESS:
      state = {
        ...state,
        loading: false,
        projectFavData: action?.payload,
      };
      break;
    case FAV_PROJECT_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    case SEND_MESSAGE_TO_OWNER_REQUEST:
      state = { ...state, loading: true, sendMessageData: null };
      break;
    case SEND_MESSAGE_TO_OWNER_SUCCESS:
      state = {
        ...state,
        loading: false,
        sendMessageData: action?.payload,
      };
      break;
    case SEND_MESSAGE_TO_OWNER_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /*add comment */
    case ADD_COMMENT_REQUEST:
      state = { ...state, loading: true };
      break;
    case ADD_COMMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        addCommentData: action?.payload,
      };
      break;
    case ADD_COMMENT_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**
     * comment edit
     */
    case COMMENT_EDIT_REQUEST:
      state = { ...state, loading: true };
      break;
    case COMMENT_EDIT_SUCCESS:
      state = { ...state, loading: false, editCommentData: action?.payload };
      break;
    case COMMENT_EDIT_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;
    /**
     * commnet delete
     */
    case COMMENT_DELETE_REQUEST:
      state = { ...state, loading: true };
      break;
    case COMMENT_DELETE_SUCCESS:
      state = {
        ...state,
        loading: false,
        deleteCommentData: action?.payload,
      };
      break;
    case COMMENT_DELETE_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /**comment list */
    case COMMENT_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case COMMENT_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        commentListData: action?.payload?.data,
      };
      break;
    case COMMENT_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /* Reviews List */
    case REVIEWS_LIST_REQUEST:
      state = { ...state, loading: true, reviewsListData: [] };
      break;
    case REVIEWS_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        reviewsListData: action?.payload?.data,
      };
      break;
    case REVIEWS_LIST_FAILED:
      state = {
        ...state,
        loading: false,
        error: action.payload?.data,
      };
      break;

    /*add faqs*/
    case ADD_FAQS_REQUEST:
      state = { ...state, loading: true };
      break;
    case ADD_FAQS_SUCCESS:
      state = { ...state, loading: false, addFaqsData: action?.payload?.data };
      break;
    case ADD_FAQS_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /* list faqs */
    case LIST_FAQS_REQUEST:
      state = { ...state, loading: true };
      break;
    case LIST_FAQS_SUCCESS:
      state = { ...state, loading: false, listFaqsData: action?.payload?.data };
      break;
    case LIST_FAQS_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    /* list file preview */
    case FILEPREVIEW_LIST_REQUEST:
      state = { ...state, loading: true };
      break;
    case FILEPREVIEW_LIST_SUCCESS:
      state = { ...state, loading: false, listFilePreviewData: action?.payload?.data };
      break;
    case FILEPREVIEW_LIST_FAILED:
      state = { ...state, loading: false, error: action.payload };
      break;

    default:
      break;
  }
  return state;
};
