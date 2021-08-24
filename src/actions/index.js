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
import graphql from "../apis/graphql";
import proxy from "../apis/proxy";

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

export const checkPendingRequests = () => (dispatch) => {};

export const signIn = (formValues) => async (dispatch) => {
  try {
    const response = await scholar.post(`/user/login`, { ...formValues });

    const data = response.data;
    const userId = data.user._id;
    const email = data.user.email;

    localStorage.setItem("Token", data.token);
    localStorage.setItem("UserId", userId);

    dispatch({ type: SIGN_IN, payload: { isSignedIn: true, userId, email } });
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
    const email = response.data[0].email;

    dispatch({ type: SIGN_IN, payload: { isSignedIn: true, userId, email } });
    history.push(`/scholars`);
  } catch (error) {
    dispatch({ type: "HIDE_LOADER" });
    history.push(`/`);
  }
};

export const signOut = () => async (dispatch) => {
  const token = localStorage.getItem("Token");

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
  localStorage.clear();
  dispatch({ type: SIGN_OUT });
  history.push(`/`);
};

export const fetchAllScholars = () => async (dispatch, getState) => {
  const token = localStorage.getItem("Token");
  const response = await scholar.get("/scholars/leaderboard", {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch({ type: "FETCH_ALL_SCHOLARS", payload: response.data });
};

export const fetchScholars = () => async (dispatch, getState) => {
  const token = localStorage.getItem("Token");
  const { userId } = getState().auth;
  const response = await scholar.get(`/scholars/user/${userId}`, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch({ type: FETCH_SCHOLARS, payload: response.data });
};

export const fetchScholar = (id) => async (dispatch) => {
  const response = await lunacian.get(`/${id}/items/1`);

  dispatch({ type: FETCH_SCHOLAR, payload: response.data });
};

export const fetchAxies = (ethAddress) => async (dispatch) => {
  const response = await graphql.post(
    "https://axieinfinity.com/graphql-server-v2/graphql",
    {
      query: `
      query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {
  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {
    total
    results {
      ...AxieBrief
      __typename
    }
    __typename
  }
}

fragment AxieBrief on Axie {
  id
  name
  stage
  class
  breedCount
  image
  title
  battleInfo {
    banned
    __typename
  }
  auction {
    currentPrice
    currentPriceUSD
    __typename
  }
  parts {
    id
    name
    class
    type
    specialGenes
    __typename
  }
  __typename
}

`,
      variables: {
        auctionType: "All",
        criteria: null,
        from: 0,
        owner: ethAddress,
        size: 24,
        sort: "IdAsc",
      },
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const axie0 = response.data.data.axies.results[0].image;
  const axie1 = response.data.data.axies.results[1].image;
  const axie2 = response.data.data.axies.results[2].image;

  const axies = { ethAddress, axie0, axie1, axie2 };

  dispatch({ type: "FETCH_AXIES", payload: axies });
};

export const fetchArena = (ethAddress) => async (dispatch) => {
  const response = await proxy.get(`/${ethAddress}`);

  const elo = response.data.stats.elo;
  const nickname = response.data.stats.name;

  dispatch({ type: "FETCH_ARENA", payload: { ethAddress, nickname, elo } });
};

export const updateDailyAverage =
  (ethAddress, dailyAverage) => async (dispatch) => {
    const token = localStorage.getItem("Token");
    const response = await scholar.patch(
      `/scholars/updateDailyAve/${ethAddress}`,
      { dailyAverage },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({ type: "UPDATE_DAILY_AVERAGE", payload: response.data });
  };

export const createScholar = (formValues) => async (dispatch, getState) => {
  const token = localStorage.getItem("Token");
  const { userId } = getState().auth;
  const response = await scholar.post(
    "/scholars/create",
    {
      ...formValues,
      userId,
    },
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

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
