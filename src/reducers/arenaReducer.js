const arenaReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ARENA":
      return { ...state, [action.payload.ethAddress]: action.payload };
    default:
      return state;
  }
};

export default arenaReducer;
