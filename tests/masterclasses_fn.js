const fetch = require('node-fetch');

const functions = {
    getallmasterclasses: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/all/5c9fc8e7bd4d924dccb49158')
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },

    memberRequiresAssessment: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/require/5c9e6506efc21019743ef7d9/5c9e6b3da9a9201a08edd936',{
                method: 'POST',
                headers: {
                    'Content-Type': 'masterclass/json'
                }
            });
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },

    expertResponds: async (extra) =>{
        try {
            const data = {
                extra: extra
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/masterclasses/respond/5c9e6506efc21019743ef7d9/5c9e6b3da9a9201a08edd936', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'masterclass/json'
                },
                body: body
            });
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },

};
module.exports = functions;