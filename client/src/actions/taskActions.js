import { GET_TASK, GET_REVIEWED_TASK, POST_TASK, GET_TASKS } from "./types";

const fetch = require("node-fetch");

// Post Task
export const postTask = (id, appID) => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/tasks/partner/${id}/${appID}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    }
  );

  const json = await res.json();
  if (json.data) {
    //   history.push("/taskform")
  } else {
    dispatch({
      type: POST_TASK,
      payload: json.data
    });
  }
};

// Get Task
export const getTask = (id, taskID) => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/tasks/admin/${id}/${taskID}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    }
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
    `http://localhost:5000/api/tasks/member/${id}/${taskID}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwtToken")
      }
    }
  );

  const json = await res.json();
  dispatch({
    type: GET_REVIEWED_TASK,
    payload: json.data
  });
};

// Get all Tasks
export const getTasks = () => async dispatch => {
  const res = await fetch("http://localhost:5000/api/tasks/all");

  const json = await res.json();
  if (json.data) {
    dispatch({
      type: GET_TASKS,
      payload: json.data
    });
  } else {
    dispatch({
      type: GET_TASKS,
      payload: null
    });
  }
};
