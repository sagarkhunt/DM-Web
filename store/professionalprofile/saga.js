import { get, post } from "@/utils/axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FOLLOW_FOLLOWING_LIST_REQUEST,
  FOLLOW_FOLLOWING_REQUEST,
  SHOPE_LIST_REQUEST,
  SHOP_OWNER_REVIEW_LIST_REQUEST
} from "./actionTypes";
import {
  followFollowingFailed,
  followFollowingListFailed,
  followFollowingListSuccess,
  followFollowingSuccess,
  shopeListFailed,
  shopeListSuccess,
  shopeOwnerReviewFailed,
  shopeOwnerReviewSuccess
} from "./actions";

/* shope list api */
function* professionalShopeList({ payload: { body, id } }) {
  try {
    const response = yield call(
      get,
      `/users/get-user-info/${id}?page=${body?.page}&search=${body?.search}&categoryId=${body?.categoryId}&limit=${body?.limit}&isProfessionalProject=${body?.isProfessionalProject}`
    );
    yield put(shopeListSuccess(response));
  } catch (error) {
    yield put(shopeListFailed(error));
  }
}

/**
 * Follow Following
 */

function* followFollowing({ payload: { id } }) {
  try {
    const response = yield call(post, `/follow-activity/follow/${id}`);
    yield put(followFollowingSuccess(response));
  } catch (error) {
    yield put(followFollowingFailed(error));
  }
}

/* Project list api */
function* followFollowingList({ payload: { body, id } }) {
  try {
    const response = yield call(
      get,
      `/follow-activity/follow/${id}?page=${body?.page}&search=${body?.search}&limit=${body?.limit}&type=${body?.type}`
    );
    yield put(followFollowingListSuccess(response));
  } catch (error) {
    yield put(followFollowingListFailed(error));
  }
}
/**
 * 
 * @param {shopOwnerReviewList} body,id 
 */
function* shopOwnerReviewList({ payload: { body, id } }) {
  try {
    const response = yield call(
      get,
      `/rating/professional-profile/${id}?page=${body?.page}&search=${body?.search}&limit=${body?.limit}`
    );
    yield put(shopeOwnerReviewSuccess(response));
  } catch (error) {
    yield put(shopeOwnerReviewFailed(error));
  }
}

function* professionalProfile() {
  yield takeLatest(SHOPE_LIST_REQUEST, professionalShopeList);
  yield takeLatest(FOLLOW_FOLLOWING_REQUEST, followFollowing);
  yield takeLatest(FOLLOW_FOLLOWING_LIST_REQUEST, followFollowingList);
  yield takeLatest(SHOP_OWNER_REVIEW_LIST_REQUEST, shopOwnerReviewList);
}

export default professionalProfile;
