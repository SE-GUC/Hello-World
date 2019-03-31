const axios = require('axios');

const functions = {
        add: (x,y) => x+y,
        getTaskID: async () => {
        const Task = await axios.get('http://localhost:3000/routes/api/tasks.js/apply/:1/:2')
        return user
        },
	getBooks: async () => {
        const books = await axios.get('http://localhost:3000/api/books/')
        return books
        },
        
};
module.exports = functions;