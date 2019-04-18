import {GET_ERRORS} from "./types"
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
      history.push("/CreatePartner");
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: json
      });
  }};
 