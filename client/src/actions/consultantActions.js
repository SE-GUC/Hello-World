import { GET_CONSULTANT } from "./types";
const fetch = require("node-fetch");

// Get Partner
export const getConsultant = id => async dispatch => {
  const res = await fetch(
    `http://localhost:5000/api/profiles/consultant/${id}`
  );

  const json = await res.json();
  if (json.data) {
    dispatch({
      type: GET_CONSULTANT,
      payload: json.data
    });
  } else {
    dispatch({
      type: GET_CONSULTANT,
      payload: {}
    });
  }
};

// Create Profile
export const createConsultant = (consultantData, history) => async dispatch => {
  const body = JSON.stringify(consultantData);
  const res = await fetch("http://localhost:5000/api/profiles/consultant", {
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
// delete profile
router.delete('/:id', async (req, res) => {
    try {
      const currConsultant= await User.findOne({_id:req.params.id ,tags: 'Consultant' })     
      if (currConsultant) {
        const index=currConsultant.tags.indexOf('Consultant')
          currConsultant.tags.splice(index,1)
       currConsultant.save()
        res.json({ msg: 'Consultant was deleted successfully'})
      } else {
        res.json({ msg: 'Consultant was deleted Already or Not Found' })
      }
    }
    catch (error) {
      // We will be handling the error later
      console.log(error)
    }
  })
  
 //apply for an application
export const postApplication = (ApplicationData, history) => async dispatch => {
  const body = JSON.stringify(ApplicationData);
  const res = await fetch("http://localhost:5000/api/consultants/:id", {
    method: "POST",
    headers: {
      "Content-Type": "consultant/json",
      Authorization: localStorage.getItem("jwtToken")
    },
    body: body
  });
  const json = await res.json();
  if (json.data) {
    history.push("/dashboardforPartner");
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: json
    });
  }
}; 
// Edit Profile
export const editConsultant = (memberData, history) => async dispatch => {
  const body = JSON.stringify(consultantData);
  const res = await fetch("http://localhost:5000/api/profiles/consultant", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwtToken")
    },
    body: body
  });
  const json = await res.json();
  if (json.msg) {
    history.push("/dashboard");
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: json
    });
  }
};
