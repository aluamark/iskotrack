import { FETCH_SLP_PRICE, FETCH_AXS_PRICE } from "./types";

const INITIAL_STATE = {
  slpPrice: 0,
  axsPrice: 0,
};

const slpReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SLP_PRICE:
      return { ...state, slpPrice: action.payload };
    case FETCH_AXS_PRICE:
      return { ...state, axsPrice: action.payload };
    default:
      return state;
  }
};

export default slpReducer;
