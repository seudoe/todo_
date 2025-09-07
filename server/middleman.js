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

function getUserOf(email){
    return users.find(user => user.email === email);
}

function addUser(email, pass){
    if(emailExists(email)){
        return false;
    }
    users.push({
        email : email,
        password: pass,
        notes: [
            {
                id: '0001',
                note : 'Welcome Note',
                date : 'somedate'
            }
        ],
        notesDone: [
            {
                id: '0001',
                note : 'Done note',
                date : 'sone'
            }
        ]
    });
    return true;
}

function printUsers(){
    console.log('users ---------------------------------------------------\n', 
        JSON.stringify(users, null, 2)
    )
}

module.exports = { emailExists, authorized, getUserOf, addUser };