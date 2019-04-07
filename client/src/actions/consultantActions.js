import { GET_CONSULTANT } from "./types";
const fetch = require("node-fetch");

export const getConsultant = id => async dispatch => {
  const res = await fetch(`http://localhost:5000/api/profiles/consultant/${id}`
  );

  const json = await res.json();
  dispatch({
    type: GET_CONSULTANT,
    payload: json.data
  });
};
