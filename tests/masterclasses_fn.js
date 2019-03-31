const fetch = require('node-fetch');

const functions = {
<<<<<<< HEAD
    getallmasterclasses: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/all/5c9fc8e7bd4d924dccb49158')
=======
    requireAssessment: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/require/5c966ec2cd9d4e42609ed0a8/5c9e6b3da9a9201a08edd936', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
>>>>>>> task
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },
<<<<<<< HEAD

    memberRequiresAssessment: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/require/5c9e6506efc21019743ef7d9/5c9e6b3da9a9201a08edd936',{
                method: 'POST',
                headers: {
                    'Content-Type': 'masterclass/json'
=======
    respond: async (theResponse) => {
        try {
            const data = {
                response: theResponse
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/masterclasses/respond/5c966ec2cd9d4e42609ed0a8/5c9e6b3da9a9201a08edd936', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
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
    apply: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/5c966ec2cd9d4e42609ed0a8/5c9fc8e7bd4d924dccb49158', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
>>>>>>> task
                }
            });
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },
<<<<<<< HEAD

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
=======
    getRecommended: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/5c9677e786479b242cdcf572');
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },
    Assess: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/masterclasses/assess/5c9677e786479b242cdcf572/5c9e6b3da9a9201a08edd936/5c9fc8e7bd4d924dccb49158', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
>>>>>>> task
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },

};
<<<<<<< HEAD
=======

>>>>>>> task
module.exports = functions;