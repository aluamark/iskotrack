import _ from "lodash";

import { FETCH_SCHOLAR, DELETE_SCHOLAR_DATA } from "./types";

const scholarDataReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SCHOLAR:
      return { ...state, [action.payload.client_id]: action.payload };
    case DELETE_SCHOLAR_DATA:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default scholarDataReducer;
