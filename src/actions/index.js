import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_SCHOLARS,
  FETCH_SCHOLAR,
  CREATE_SCHOLAR,
  DELETE_SCHOLAR,
  DELETE_SCHOLAR_DATA,
  FETCH_SLP_PRICE,
  FETCH_AXS_PRICE,
} from "./types";

import scholar from "../apis/scholar";
import lunacian from "../apis/lunacian";
import coingecko from "../apis/coingecko";

import history from "../history";

export const showLoader = () => (dispatch) => {
  dispatch({
    type: "SHOW_LOADER",
  });
};

export const showReloadLoading = () => (dispatch) => {
  dispatch({
    type: "SHOW_RELOAD_LOADING",
  });
};

export const hideLoader = () => (dispatch) => {
  dispatch({
    type: "HIDE_LOADER",
  });
};

export const signIn = (formValues) => async (dispatch) => {
  try {
    const response = await scholar.post(`/user/login`, { ...formValues });

    const data = response.data;
    const userId = data.user._id;

    sessionStorage.setItem("Token", data.token);
    sessionStorage.setItem("UserId", userId);

    dispatch({ type: SIGN_IN, payload: { isSignedIn: true, userId } });
    history.push(`/scholars`);
  } catch (error) {
    dispatch({ type: "HIDE_LOADER" });
  }
};

export const bypass = (session) => async (dispatch) => {
  try {
    const response = await scholar.get(
      `/user/bypassLogin/${session.userId}/${session.token}`
    );

    const userId = response.data[0]._id;

    dispatch({ type: SIGN_IN, payload: { isSignedIn: true, userId } });
    history.push(`/scholars`);
  } catch (error) {
    dispatch({ type: "HIDE_LOADER" });
    history.push(`/`);
  }
};

export const signOut = () => async (dispatch) => {
  const token = sessionStorage.getItem("Token");

  await scholar.post(
    "/user/logout",
    {},
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  sessionStorage.clear();
  dispatch({ type: SIGN_OUT });
  history.push(`/`);
};

export const fetchScholars = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await scholar.get(`/scholars/user/${userId}`);

  dispatch({ type: FETCH_SCHOLARS, payload: response.data });
};

export const fetchScholar = (id) => async (dispatch) => {
  const response = await lunacian.get(`/${id}/items/1`);

  dispatch({ type: FETCH_SCHOLAR, payload: response.data });
};

export const createScholar = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await scholar.post("/scholars/create", {
    ...formValues,
    userId,
  });

  dispatch({ type: CREATE_SCHOLAR, payload: response.data });
};

export const deleteScholar = (ethAddress) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  await scholar.delete(`/scholars/user/${userId}/delete/${ethAddress}`);

  dispatch({ type: DELETE_SCHOLAR, payload: ethAddress });
};

export const deleteScholarData = (ethAddress) => async (dispatch) => {
  dispatch({ type: DELETE_SCHOLAR_DATA, payload: ethAddress });
};

export const fetchSlpPrice = () => async (dispatch) => {
  const response = await coingecko.get("/coins/smooth-love-potion");

  const slpPrice = response.data.market_data.current_price.php;

  dispatch({ type: FETCH_SLP_PRICE, payload: slpPrice });
};

export const fetchAxsPrice = () => async (dispatch) => {
  const response = await coingecko.get("/coins/axie-infinity");

  const axsPrice = response.data.market_data.current_price.php;

  dispatch({ type: FETCH_AXS_PRICE, payload: axsPrice });
};
