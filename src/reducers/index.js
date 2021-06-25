import { combineReducers } from "redux";

import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import scholarReducer from "./scholarReducer";
import scholarDataReducer from "./scholarDataReducer";
import slpReducer from "./slpReducer";
import arenaReducer from "./arenaReducer";

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  scholars: scholarReducer,
  scholarsData: scholarDataReducer,
  scholarsArenaData: arenaReducer,
  slpData: slpReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "SIGN_OUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
