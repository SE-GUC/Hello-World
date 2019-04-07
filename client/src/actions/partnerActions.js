import { GET_PARTNER } from "./types"
const fetch = require("node-fetch");
export const getPartner = id => async dispatch =>{
    const res = await fetch(`http://localhost:5000/api/profiles/partner/${id}`);
    const json =await res.json();
    dispatch({
        type: GET_PARTNER,
        payload: json.data
    });
};
