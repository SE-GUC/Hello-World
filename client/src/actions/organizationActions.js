import { GET_ERRORS } from "./types";
const fetch = require("node-fetch");

// Create Organization
export const createOrganization = (memberData, history) => async dispatch => {
  const body = JSON.stringify(memberData);
  const res = await fetch("http://localhost:5000/api/profiles/organization", {
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
