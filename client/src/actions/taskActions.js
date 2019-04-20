import { GET_TASK, GET_REVIEWED_TASK, POST_TASK } from "./types";

const fetch = require("node-fetch");



// Post Task
export const postTask = (taskData, history) => async dispatch => {
  const body = JSON.stringify(taskData);
  const res = await fetch("http://localhost:5000/api/tasks/partner/${taskData.ID}/${taskData.application}", {
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


// // Post Task
// export const postTask = (taskdata , history) => async dispatch => {
//   // const id = taskdata.ID
//   // const appid = taskdata.application
//   delete taskdata.application
//   delete taskdata.ID
//   const body = JSON.stringify(taskdata);
//   const res = await fetch(
//     `http://localhost:5000/api/tasks/partner/5c941c4acb4bc3216896d13c/5c9bfa4aae4b8b53f8b647c6`,
//     { 
//       method: "POST",
//       headers: {
//         Authorization: localStorage.getItem("jwtToken")
//       },
//       body: body
      
//     }
//   );

//   const json = await res.json();
//   if(json.data){
//    history.push("/dashboard")
//   } else{
//     dispatch({
//       type: POST_TASK,
//       payload: json.data
//     });
//   }  
// };

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
