const fetch = require('node-fetch');
const functions = {
    createMember: async (name,phone,age,email,skills,interests) =>{
        try {
            const data = {
                name:name,
                age:age,
                phone:phone,
                email:email,
                skills:skills,
                intersets:intersets
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000api/profiles/member/5c941ca6c49fc207a0cd1e51', {
                method: 'POST',
                headers: {
                    'Content-Type': 'member/json'
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
    updateMember: async (name,phone,email,age) =>{
      try{
          const data = {
            name:name,
            age:age,
            phone:phone,
            email:email,
          }
          const body = JSON.stringify(data);
          const response = await fetch('http://localhost:5000/api/profiles/member/5c941ca6c49fc207a0cd1e51', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'member/json'
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
    addSkill: async (skill) => {
        try{
            const data = {
                skill:skill
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/member/skills/5c9666a6f17db66cb83411d3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'member/json'
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
    addInterest: async (interest) => {
        try{
            const data = {
                interest:interest
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/member/interests/5c9666a6f17db66cb83411d3',{
            method: 'POST',
            headers: {
                'Content-Type': 'member/json'
            },
            body: body
        });
            const json = await response.json();
            return json;
    }
        catch(e) {
            console.log(e)
        }
    },
    postEvents: async (event) => {
        try{
            const data = {
                event:event
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/member/past-events/5c9666a6f17db66cb83411d3',{
                method:'POST',
                headers:{
                    'content-Type':'member/json'
                },
                body:body
            });
            const json = await response.json();
            return json;
        }
    catch(err){
        console.log(e)
    }
    },
    postCompeletedTask: async (task) => {
        try{
            const data = {
                task:task
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/member/completed-tasks/5c9666a6f17db66cb83411d3/5c962a4c0f3ef52e1974de42',{
                method:'POST',
                headers:{
                    'content-Type':'member/json'
                },
                body:body
            });
            const json = await response.json();
            return json;
        }
    catch(err){
        console.log(e)
    }
    },
    postCertificates: async (certificate) => {
        try{
            const data = {
                certificate:certificate
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/member/certificates/5c9666a6f17db66cb83411d3',{
                method:'POST',
                headers:{
                    'content-Type':'member/json'
                },
                body:body
            });
            const json = await response.json();
            return json;
        }
    catch(err){
        console.log(e)
    }
    },
    postMasterclass: async (masterclass) => {
        try{
            const data = {
                masterclass:masterclass
            }
            const body = JSON.stringify(data);
            const response = await fetch('http://localhost:5000/api/profiles/member/masterclasses/add/5c9666a6f17db66cb83411d3/5c9d1e2b1c9d4400006312da',{
                method:'POST',
                headers:{
                    'content-Type':'member/json'
                },
                body:body
            });
            const json = await response.json();
            return json;
        }
    catch(err){
        console.log(e)
    }
    },
};
module.exports = functions;