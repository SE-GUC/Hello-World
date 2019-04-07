import { GET_TASK } from "./types";
import { GET_REVIEWED_TASK } from "./types";
const fetch = require("node-fetch");

// Get Task
export const getTask = (id, taskID) => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/tasks/admin/${id}/${taskID}`
  );

  const json = await res.json();
  dispatch({
    type: GET_TASK,
    payload: json.data
  });
};

// Get Reviewed Task
export const getReviewedTask = (id, taskID) => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/tasks/member/${id}/${taskID}`
  );

  const json = await res.json();
  dispatch({
    type: GET_REVIEWED_TASK,
    payload: json.data
  });
};
