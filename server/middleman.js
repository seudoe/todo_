const db = require('./db.js');
const { users } = db;
// console.log('users :          ',JSON.parse(JSON.stringify(users)));
console.log('users :          ',users);

function emailExists(email){
    return users.find( (user) => {
        return user.email === email;
    });
}

function authorized(email, password) {
    if(emailExists(email)){
        let user = emailExists(email);
        return {
            status : user.password === password,
            string : 'Exists'
        };
    }
    else {
        console.log('email doest exist');
        return { 
            status : false,
            string : 'Not-exists'
        };
    }
}

module.exports = { emailExists, authorized };