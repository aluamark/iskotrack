import _ from "lodash";

import {
  FETCH_SCHOLARS,
  CREATE_SCHOLAR,
  EDIT_SCHOLAR,
  DELETE_SCHOLAR,
} from "./types";

const scholarReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SCHOLARS:
      return { ...state, ..._.mapKeys(action.payload, "ethAddress") };
    case CREATE_SCHOLAR:
      return { ...state, [action.payload.ethAddress]: action.payload };
    case EDIT_SCHOLAR:
      return { ...state, [action.payload.ethAddress]: action.payload };
    case DELETE_SCHOLAR:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default scholarReducer;
