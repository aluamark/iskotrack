const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  email: null,
  loading: false,
  reloadLoading: false,
  leaderboardLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: action.payload.isSignedIn,
        userId: action.payload.userId,
        email: action.payload.email,
      };
    case "SHOW_LOADER":
      return { ...state, loading: true };
    case "SHOW_RELOAD_LOADING":
      return { ...state, reloadLoading: true };
    case "HIDE_LOADER":
      return { ...state, loading: false, reloadLoading: false };
    case "SIGN_OUT":
      return { ...state, isSignedIn: false, userId: null };
    case "SHOW_LEADERBOARD_LOADING":
      return { ...state, leaderboardLoading: true };
    default:
      return state;
  }
};

export default authReducer;
