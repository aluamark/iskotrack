import { combineReducers } from "redux";

import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import allScholarReducer from "./allScholarReducer";
import scholarReducer from "./scholarReducer";
import scholarDataReducer from "./scholarDataReducer";
import slpReducer from "./slpReducer";
import scholarAxiesReducer from "./scholarAxiesReducer";
import scholarArenaReducer from "./scholarArenaReducer";

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  allScholars: allScholarReducer,
  scholars: scholarReducer,
  scholarsData: scholarDataReducer,
  scholarsAxies: scholarAxiesReducer,
  scholarArena: scholarArenaReducer,
  slpData: slpReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
