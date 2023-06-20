import { uniqueId } from "@/utils/uId";
import { call, put, takeLatest } from "redux-saga/effects";
import { del, get, post, putApi } from "../../utils/axios";
import { deleteCollectionFailed } from "../collection/actions";
import {
  ADD_COMMENT_REQUEST,
  ADD_FAQS_REQUEST,
  COMMENT_DELETE_REQUEST,
  COMMENT_EDIT_REQUEST,
  COMMENT_LIST_REQUEST,
  FAV_PROJECT_REQUEST,
  FILEPREVIEW_LIST_REQUEST,
  LIST_FAQS_REQUEST,
  LIST_FAV_PROJECT_REQUEST,
  LIST_PROJECT_REQUEST,
  PROJECT_DETAILS_REQUEST,
  REVIEWS_LIST_REQUEST,
  SEND_MESSAGE_TO_OWNER_REQUEST,
} from "./actionTypes";
import {
  addCommentSuccess,
  addCommentfailed,
  addFaqsFailed,
  commentListFailed,
  commentListSuccess,
  deleteCommentSuccess,
  editCommentFailed,
  editCommentSuccess,
  favProjectFailed,
  favProjectSuccess,
  filePreviewFailed,
  filePreviewSuccess,
  listFaqsFailed,
  listFaqsSuccess,
  listFavProjectFailed,
  listFavProjectSuccess,
  listProjectFailed,
  listProjectSuccess,
  projectDetailsFailed,
  projectDetailsSuccess,
  reviewsListFailed,
  reviewsListSuccess,
  sendMessageToOwnerFailed,
  sendMessageToOwnerSuccess
} from "./actions";

/* Project list api */
function* projectList({ payload: data }) {
  try {
    const response = yield call(get, "/projects", data);
    yield put(listProjectSuccess(response));
  } catch (error) {
    yield put(listProjectFailed(error));
  }
}

/* fav Project list api */
function* favProjectList({ payload: data }) {
  try {
    const response = yield call(get, "/projects", data);
    yield put(listFavProjectSuccess(response));
  } catch (error) {
    yield put(listFavProjectFailed(error));
  }
}

/**
 * get by id project details
 */

function* singleProjectDetails({ payload: { data } }) {
  try {
    const body = uniqueId();
    const response = yield call(get, `/projects/${data}?uid=${body?.uid}`);
    yield put(projectDetailsSuccess(response));
  } catch (error) {
    yield put(projectDetailsFailed(error));
  }
}
/* Add to favourite api */
function* projectFavourite({ payload: { projectId } }) {
  try {
    const response = yield call(post, `/favorite/${projectId}`);
    yield put(favProjectSuccess(response));
  } catch (error) {
    yield put(favProjectFailed(error));
  }
}

/* send message to owner api */
function* sendMessageToOwner({ payload: { data } }) {
  try {
    // const response = yield call(post, `/favorite/${projectId}`);
    yield put(sendMessageToOwnerSuccess(response));
  } catch (error) {
    yield put(sendMessageToOwnerFailed(error));
  }
}

/* review api*/
function* reviewsListData({ payload: { data, projectId } }) {
  try {
    const response = yield call(
      get,
      `/rating/${projectId}?sortBy=${data?.sortBy}`
    );
    yield put(reviewsListSuccess(response));
  } catch (error) {
    yield put(reviewsListFailed(error));
  }
}

/*add comment api */
function* createComment({ payload: { data, projectId } }) {
  try {
    const response = yield call(post, `/comment/${projectId}`, data);
    yield put(addCommentSuccess(response));
  } catch (error) {
    yield put(addCommentfailed(error));
  }
}

/* Comment edit api */
function* commentEdit({ payload: { commentsId, data } }) {
  try {
    const response = yield call(putApi, `/comment/${commentsId}`, data);
    yield put(editCommentSuccess(response));
  } catch (error) {
    yield put(editCommentFailed(error));
  }
}

/* Comment delete api */
function* commentDelete({ payload: { commentId } }) {
  try {
    const response = yield call(del, `/comment/${commentId}`);
    yield put(deleteCommentSuccess(response));
  } catch (error) {
    yield put(deleteCollectionFailed(error));
  }
}

/* Project list api */
function* commentList({ payload: data, projectId }) {
  try {
    const response = yield call(get, `/comment/${data?.projectId}`, data);
    yield put(commentListSuccess(response));
  } catch (error) {
    yield put(commentListFailed(error));
  }
}

/* add faqs api*/
function* faqsData({ payload: { data } }) {
  try {
    // const response =yield call(get , '/faqs' ,data);
    // yield put(addFaqsSuccess(response));
  } catch (error) {
    yield put(addFaqsFailed(error));
  }
}

/*list faqs api*/
function* listFaqsData({ payload: { data } }) {
  try {
    const response = yield call(get, "/listfaqs", data);
    yield put(listFaqsSuccess(response));
  } catch (error) {
    yield put(listFaqsFailed(error));
  }
}

/**
 *
 * @param {filePreviewList} param0
 */
function* filePreviewList({ payload: { projectId } }) {
  try {
    const response = yield call(get, `/projects/zip-file/${projectId}`);
    yield put(filePreviewSuccess(response));
  } catch (error) {
    yield put(filePreviewFailed(error));
  }
}

function* ProjectSaga() {
  yield takeLatest(LIST_PROJECT_REQUEST, projectList);
  yield takeLatest(LIST_FAV_PROJECT_REQUEST, favProjectList);
  yield takeLatest(PROJECT_DETAILS_REQUEST, singleProjectDetails);
  yield takeLatest(FAV_PROJECT_REQUEST, projectFavourite);
  yield takeLatest(SEND_MESSAGE_TO_OWNER_REQUEST, sendMessageToOwner);
  yield takeLatest(ADD_COMMENT_REQUEST, createComment);
  yield takeLatest(COMMENT_EDIT_REQUEST, commentEdit);
  yield takeLatest(REVIEWS_LIST_REQUEST, reviewsListData);
  yield takeLatest(ADD_FAQS_REQUEST, faqsData);
  yield takeLatest(LIST_FAQS_REQUEST, listFaqsData);
  yield takeLatest(COMMENT_LIST_REQUEST, commentList);
  yield takeLatest(COMMENT_DELETE_REQUEST, commentDelete);
  yield takeLatest(FILEPREVIEW_LIST_REQUEST, filePreviewList);
}

export default ProjectSaga;
