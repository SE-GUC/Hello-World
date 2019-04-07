import { GET_APPLICATION } from "./types";
import { GET_REVIEWED_APPLICATION } from "./types";
const fetch = require("node-fetch");

// Get Application
export const getApplication = (id, appID) => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/applications/admin/${id}/${appID}`
  );

  const json = await res.json();
  dispatch({
    type: GET_APPLICATION,
    payload: json.data
  });
};

// Get Reviewed Application
export const getReviewedApplication = (id, appID) => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/applications/consultant/${id}/${appID}`
  );

  const json = await res.json();
  dispatch({
    type: GET_REVIEWED_APPLICATION,
    payload: json.data
  });
};
