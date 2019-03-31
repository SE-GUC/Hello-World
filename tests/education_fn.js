const fetch = require('node-fetch');
const functions = {
    
    createEducational: async (Organization) =>{
        try {
            const data = {
                Organization:Organization
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/5c9f6e620e57b6046a44987e', {
                method: 'POST',
                headers: {
                    'Content-Type': 'education/json'
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
    
    getEducationalprofileID: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profiles/education/5c9f5e320e57b6046a449875')
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },
    addTrainer: async (trainer) => {
        try{
            const data = {
                name:name,
                bio:bio,
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/trainers/5c9f82d10e57b6046a44988a', {
                method: 'POST',
                headers: {
                    'Content-Type': 'education/json'
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
    addCertificates: async (title,description) => {
        try{
            const data = {
                title: title,
                description:description,
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/certificates/5c9f82d10e57b6046a44988a', {
                method: 'POST',
                headers: {
                    'Content-Type': 'education/json'
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
    addTrainingProgram: async (program) => {
        try{
            const data = {
                title: title,
                description:description,
                trainers:trainers,
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/training-programs/5c9f5e320e57b6046a449875', {
                method: 'POST',
                headers: {
                    'Content-Type': 'education/json'
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
    deleteEducation: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profiles/education/5c9f82d10e57b6046a44988a',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },
    addCourse: async (course) => {
        try{
            const data = {
                title: title,
                description:description,
                price:price,
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/courses/5c9f82d10e57b6046a44988a', {
                method: 'POST',
                headers: {
                    'Content-Type': 'education/json'
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