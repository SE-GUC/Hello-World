import { GET_APPLICATION } from "./types";
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
