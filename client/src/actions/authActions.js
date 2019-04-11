import fetch from "node-fetch";
import { GET_ERRORS } from "./types";

// Register User
export const registerUser = (userData, history) => async dispatch => {
  const body = JSON.stringify(userData);
  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body
  });
  const json = await res.json();
  if (json.error) {
    dispatch({
      type: GET_ERRORS,
      payload: json
    });
  } else {
    history.push("/login");
  }
};
