import { GET_APPLICATION } from "./types";
import { GET_REVIEWED_APPLICATION } from "./types";
import {POST_APPLICATION} from "./types";
const fetch = require("node-fetch");

// Get Application
export const getApplication = (id, appID) => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/applications/admin/${id}/${appID}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    }
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
    `http://localhost:5000/api/applications/consultant/${id}/${appID}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    }
  );

  const json = await res.json();
  dispatch({
    type: GET_REVIEWED_APPLICATION,
    payload: json.data
  });
};
export const postApplication = id => async dispatch => {
  const body = JSON.stringify(userData);
  const res = await fetch(
    `http://localhost:5000/api/applications/${id}`,
    { method ="POST",
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      },
      body:body
    }
  );
const json = await res.json();
dispatch({
  type: POST_APPLICATION,
  payload: json.data
})}