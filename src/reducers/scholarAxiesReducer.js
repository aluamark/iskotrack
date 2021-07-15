const scholarAxiesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_AXIES":
      return { ...state, [action.payload.ethAddress]: action.payload };
    default:
      return state;
  }
};

export default scholarAxiesReducer;
