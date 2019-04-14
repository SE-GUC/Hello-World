import { GET_APPLICATIONS } from "./types";
const fetch = require("node-fetch");

export const getApplications = id => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/applications/admin/${id}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    }
  );

  const json = await res.json();
  dispatch({
    type: GET_APPLICATIONS,
    payload: json.data
  });
};
