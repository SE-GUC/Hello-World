import { GET_CONSULTANT } from "./types";
const fetch = require("node-fetch");

// Get Partner
export const getConsultant = id => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/profiles/consultant/${id}`
  );

  const json = await res.json();
  if (json.data) {
    dispatch({
      type: GET_CONSULTANT,
      payload: json.data
    });
  } else {
    dispatch({
      type: GET_CONSULTANT,
      payload: {}
    });
  }
};

// Create Profile
export const createConsultant = (consultantData, history) => async dispatch => {
  const body = JSON.stringify(consultantData);
  const res = await fetch("http://localhost:5000/api/profiles/consultant", {
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

// Edit Profile
export const editConsultant = (memberData, history) => async dispatch => {
  const body = JSON.stringify(consultantData);
  const res = await fetch("http://localhost:5000/api/profiles/consultant", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken")
    },
    body: body
  });
  const json = await res.json();
  if (json.msg) {
    history.push("/dashboard");
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: json
    });
  }
};
