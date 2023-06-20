import { call, put, takeLatest } from "redux-saga/effects";
import { del, get, post, putApi } from "../../utils/axios";
import {
  addToCollectionFailed,
  addToCollectionSuccess,
  createCollectionFailed,
  createCollectionSuccess,
  deleteCollectionFailed,
  deleteCollectionSuccess,
  getCollectionFailed,
  getCollectionSuccess,
  listCollectionFailed,
  listCollectionSuccess,
  updateCollectionFailed,
  updateCollectionSuccess,
} from "./actions";
import {
  ADD_TO_COLLECTION_REQUEST,
  CREATE_COLLECTION_REQUEST,
  DELETE_COLLECTION_REQUEST,
  GET_COLLECTION_REQUEST,
  LIST_COLLECTION_REQUEST,
  UPDATE_COLLECTION_REQUEST,
} from "./actionTypes";
import { getProjectListRequest } from "../homepage/actions";
import { shopeListRequest } from "../professionalprofile/actions";
import { uniqueId } from "@/utils/uId";

/* Collection list api */
function* collectionList({ payload: data }) {
  try {
    const response = yield call(
      get,
      `/collection/get-all-collections-by-userid/${localStorage.getItem(
        "userID"
      )}`,
      data
    );
    yield put(listCollectionSuccess(response));
  } catch (error) {
    yield put(listCollectionFailed(error));
  }
}
/* Collection details api */
function* getCollection({ payload: data }) {
  try {
    const body = uniqueId();
    console.log("🚀 ~ file: saga.js:45 ~ function*getCollection ~ data:", data);
    let response = null;
    if (data.collectionId) {
      response = yield call(
        get,
        `/collection/${data.collectionId}?uid=${body?.uid}`
      );
    } else {
      response = yield call(
        get,
        `/collection${data.collectionId ? "/" + data.collectionId : ""}`,
        data
      );
    }
    yield put(getCollectionSuccess(response));
  } catch (error) {
    yield put(getCollectionFailed(error));
  }
}
/* Collection create api */
function* collectionCreate({ payload: data }) {
  try {
    const body = {
      collection_name: data?.collection_name,
      isPublic: data?.isPublic,
      projectId: data?.projectId,
    };
    const response = yield call(post, "/collection", body);
    yield put(createCollectionSuccess(response));
    if (response && data?.pageType === "Home") {
      yield put(getProjectListRequest());
    } else if (response && data?.pageType === "Professional") {
      const body = {
        page: data?.params?.page,
        search: data?.params?.search,
        limit: data?.params?.limit,
        categoryId: data?.params?.categoryId,
        isProfessionalProject: true,
      };
      yield put(
        shopeListRequest({
          body,
          id: data?.params?.professionalId,
        })
      );
    }
  } catch (error) {
    yield put(createCollectionFailed(error));
  }
}
/* Collection upate api */
function* collectionUpdate({ payload: { id, data } }) {
  try {
    const response = yield call(putApi, `/collection/${id}`, data);
    yield put(updateCollectionSuccess(response));
  } catch (error) {
    yield put(updateCollectionFailed(error));
  }
}
/* Collection delete api */
function* collectionDelete({ payload: { router, id } }) {
  try {
    const response = yield call(del, `/collection/${id}`);
    yield put(deleteCollectionSuccess(response));
    router.push(`/profile/account-profile?index=collection`);
  } catch (error) {
    yield put(deleteCollectionFailed(error));
  }
}
/* Collection add to api */
function* addToCollection({ payload: data }) {
  try {
    const response = yield call(putApi, `/collection/add-remove/${data.id}`, {
      projectId: data?.projectId,
    });
    yield put(addToCollectionSuccess(response));
    if (response && data?.pageType === "Home") {
      yield put(getProjectListRequest());
    } else if (response && data?.pageType === "Professional") {
      const body = {
        page: data?.params?.page,
        search: data?.params?.search,
        limit: data?.params?.limit,
        categoryId: data?.params?.categoryId,
        isProfessionalProject: true,
      };
      yield put(
        shopeListRequest({
          body,
          id: data?.params?.professionalId,
        })
      );
    }
  } catch (error) {
    yield put(addToCollectionFailed(error));
  }
}

function* CollectionSaga() {
  yield takeLatest(LIST_COLLECTION_REQUEST, collectionList);
  yield takeLatest(GET_COLLECTION_REQUEST, getCollection);
  yield takeLatest(CREATE_COLLECTION_REQUEST, collectionCreate);
  yield takeLatest(UPDATE_COLLECTION_REQUEST, collectionUpdate);
  yield takeLatest(DELETE_COLLECTION_REQUEST, collectionDelete);
  yield takeLatest(ADD_TO_COLLECTION_REQUEST, addToCollection);
}

export default CollectionSaga;
