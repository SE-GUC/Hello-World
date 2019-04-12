import { GET_MEMBER, GET_MEMBERS } from "./types";
const fetch = require("node-fetch");

// Get Member
export const getMember = id => async dispatch => {
  const res = await fetch(`http://localhost:5000/api/profiles/member/${id}`);

  const json = await res.json();
  dispatch({
    type: GET_MEMBER,
    payload: json.data
  });
};

// Get all members
export const getMembers = () => async dispatch => {
  const res = await fetch("/api/profiles/member/all");

  const json = await res.json();
  if (json.data) {
    console.log("Successeded");
    dispatch({
      type: GET_MEMBERS,
      payload: json.data
    });
  } else {
    console.log("failed");
    dispatch({
      type: GET_MEMBERS,
      payload: null
    });
  }
};
