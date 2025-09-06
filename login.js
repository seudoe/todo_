console.log('Hello');

// localStorage.setItem('localEmail', JSON.stringify({email : 'Email'}));


// const local = JSON.parse(localStorage.getItem('localEmail')); 

let emailInp = document.querySelector('.emailInp');
let passInp = document.querySelector('.passwInp');

let loginButton = document.querySelector('.login-button');

let current_user = {};

loginButton.onclick = () => {
    console.log('Sending: ');
    console.log({
        email : emailInp.value,
        pass : passInp.value
    });
    fetch('http://localhost:8899/login', {
        method: 'POST',
        headers : {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            email : emailInp.value,
            pass : passInp.value
        })
    })
    .then((response) => {
        return response.json();
    })
    .then ((data) => {
        if(data){
            if(data.status === 0){
                console.log('U r right , clearing .incorrect msg');
                document.querySelector('.incorrect').innerHTML = ``;
                window.location.href = 'http://localhost:8899/home';
                current_user = {
                    email : emailInp.value
                }
                // ----------------------------------------------------
                localStorage.setItem('localEmail', JSON.stringify(current_user));
            }
            else if(data.status === 1 || data.status === 2){
                document.querySelector('.incorrect').innerHTML = `Incorrect Email or Password`;
            }
        }
    })
    .catch((error) => {
        console.log('Error ----------------\n  ',  error);
    })
}



let resetButton = document.querySelector('.reset-button');
resetButton.onclick = () => {
    console.log('resetting');
    emailInp.value = ``
    passInp.value = ``
};


