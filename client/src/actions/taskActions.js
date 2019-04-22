import { GET_TASK, GET_REVIEWED_TASK} from "./types";

const fetch = require("node-fetch");



// Partner creates Task
export const PartnerPostTask = (taskData,appid,history) => async dispatch => {
  const body = JSON.stringify(taskData);
  const res = await fetch(`http://localhost:5000/api/tasks/partner/5c941c4acb4bc3216896d13c/${appid}`, {
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
  }
};


// consultant creates task
export const ConsultantPostTask = (taskData,id,appid,history) => async dispatch => {
  const body = JSON.stringify(taskData);
  const res = await fetch(`http://localhost:5000/api/tasks/consultant/${id}/${appid}`, {
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
