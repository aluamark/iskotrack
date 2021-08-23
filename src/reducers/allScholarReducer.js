import _ from "lodash";

const allScholarReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ALL_SCHOLARS":
      return { ...state, ..._.mapKeys(action.payload, "ethAddress") };
    default:
      return state;
  }
};

export default allScholarReducer;
