const { combineReducers } = require("redux");
// import {combineReducers} from "redux";

import auth from "./auth/reducer";
import homepage from "./homepage/reducer";
import category from "./category/reducer";
import project from "./project/reducer";
import collection from "./collection/reducer";
import cart from "./cart/reducer";
// import user from "./user/reducer";
import user from "./user/reducer";
import professionalprofile from "./professionalprofile/reducer";
import mypurchase from "./mypurchase/reducer";

const rootReducer = combineReducers({
  auth,
  homepage,
  category,
  project,
  collection,
  cart,
  user,
  professionalprofile,
  mypurchase,
});
const appReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return rootReducer(state, action);
};
export default appReducer;
