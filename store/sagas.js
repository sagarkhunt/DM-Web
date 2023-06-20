import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/saga";
import CartSaga from "./cart/saga";
import CategorySaga from "./category/saga";
import CollectionSaga from "./collection/saga";
import homePageSaga from "./homepage/saga";
import ProjectSaga from "./project/saga";
import userSaga from "./user/saga";
import professionalProfile from "./professionalprofile/saga";
import PurchaseSaga from "./mypurchase/saga";

export default function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(userSaga)]);
  yield all([fork(homePageSaga)]);
  yield all([fork(CategorySaga)]);
  yield all([fork(ProjectSaga)]);
  yield all([fork(CollectionSaga)]);
  yield all([fork(CartSaga)]);
  yield all([fork(professionalProfile)]);
  yield all([fork(PurchaseSaga)]);
}
