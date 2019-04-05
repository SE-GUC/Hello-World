import { GET_MEMBER } from "./types";
const fetch = require("node-fetch");

export const getMember = id => async dispatch => {
  const res = await fetch(`http://localhost:5000/api/profiles/member/${id}`);

  const json = await res.json();
  dispatch({
    type: GET_MEMBER,
    payload: json.data
  });
};
