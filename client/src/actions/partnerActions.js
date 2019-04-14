import { GET_PARTNER } from "./types";
const fetch = require("node-fetch");

// Get Partner
export const getPartner = id => async dispatch => {
  const res = await fetch(`http://localhost:5000/api/profiles/partner/${id}`, {
    headers: {
      Authorization: localStorage.getItem("jwtToken")
    }
  });

  const json = await res.json();
  dispatch({
    type: GET_PARTNER,
    payload: json.data
  });
};
// create partner
export const createPartner = (partnerData, history) => async dispatch => {
  const body = JSON.stringify(partnerData);
  const res = await fetch("http://localhost:5000/api/profiles/partner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken")
    },
    body: body
  });
  const json = await res.json();
  if (json.data) {
    history.push("/dashboard");
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: json
    });
  }
};
