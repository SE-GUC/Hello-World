const fetch = require('node-fetch');
const functions = {
<<<<<<< HEAD
    
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
=======
    addcourse: async (title,description,price) => {
        try {
            const data = {
                title: title,
                description: description,
                price: price
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/courses/5c9f6fc00e57b6046a44987f',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
>>>>>>> task
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
<<<<<<< HEAD
    
    getEducationalprofileID: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profiles/education/5c9f5e320e57b6046a449875')
=======
    addtrainer: async (name,bio) => {
        try {
            const data = {
                name: name,
                bio: bio
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/trainers/5c9f6fc00e57b6046a44987f',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
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
=======
    addCertificates: async (title, description) => {
        try {
            const data = {
                title: title,
                description: description
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/certificates/5c9f7e380e57b6046a449884',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
>>>>>>> task
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
<<<<<<< HEAD
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
=======
    addTrainingProgram: async (title, description, trainers) => {
        try {
            const data = {
                title: title,
                description: description,
                trainers: trainers
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/training-programs/5c9f7e380e57b6046a449884',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
>>>>>>> task
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
<<<<<<< HEAD
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
=======
    deleteCourse: async (title, description, price) => {
        try {
            const data = {
                title: title,
                description: description,
                price: price
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/courses/5c9f7e380e57b6046a449884',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
>>>>>>> task
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
<<<<<<< HEAD
    deleteEducation: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profiles/education/5c9f82d10e57b6046a44988a',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
=======
    deleteTrainer: async (name, bio) => {
        try {
            const data = {
                name: name,
                bio: bio
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/trainers/5c9f7e380e57b6046a449884',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
>>>>>>> task
            });
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },
<<<<<<< HEAD
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
=======
    deleteCertificates: async (title, description) => {
        try {
            const data = {
                title: title,
                description: description
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/certificates/5c9f7e380e57b6046a449884',{
                method: 'DELETE',
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
    deleteTrainingProgram: async (title, description, trainers) => {
        try {
            const data = {
                title: title,
                description: description,
                trainers: trainers
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/education/training-programs/5c9f7e380e57b6046a449884',{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
>>>>>>> task
                },
                body: body
            });
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
<<<<<<< HEAD
    
    },
};
=======
    },
    createEducationalOrganization: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profiles/education/5ca0cc060b5a143208407416',{
                method: 'POST',
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
    getEducationalOrganization: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/profiles/education/5c9f7e380e57b6046a449884');
            const json = await response.json();
            return json;
        }
        catch (e) {
            console.log(e)
        }
    },
    deleteEducationalOrganization: async () => {
      try{
          const response = await fetch('http://localhost:5000/api/profiles/education/5c9fd4940e57b6046a4498ac',{
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          const json = await response.json();
          return json;
      } catch (e) {
          console.log(e)
      }
    },



};

>>>>>>> task
module.exports = functions;