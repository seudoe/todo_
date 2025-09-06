console.log('Hello');


const local = JSON.parse(localStorage.getItem('and-include-a-reusable-footer')); 

let emailInp = document.querySelector('.emailInp');
let passInp = document.querySelector('.passwInp');

let loginButton = document.querySelector('.login-button');

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


