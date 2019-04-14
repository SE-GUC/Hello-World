import {GET_ERRORS,GET_ORGANIZATION} from "./types"
export const getOrganization = id => async dispatch => {
  const res = await fetch(`http://localhost:5000/api/profiles/organization/${id}`, {
    headers: {
      Authorization: localStorage.getItem("jwtToken")
    }
  });

  const json = await res.json();
  dispatch({
    type: GET_ORGANIZATION,
    payload: json.data
  });
};
export const createOrganization = (organizationData, history) => async dispatch => {
    const body = JSON.stringify(organizationData);
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
  export const getCurrentOrganization = id => async dispatch => {
    const res = await fetch(`http://localhost:5000/api/profiles/organization`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwtToken")
      }
    });
  
    const json = await res.json();
    if (json.data) {
      dispatch({
        type: GET_ORGANIZATION,
        payload: json.data
      });
    } else {
      dispatch({
        type: GET_ORGANIZATION,
        payload: {}
      });
    }
  };
  