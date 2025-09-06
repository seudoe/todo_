const express = require('express');
const path = require('path')
const fs = require('fs').promises;

console.log(__dirname);
console.log(path.join(__dirname , '../home.html'));

let home_html = ``;
let home_js = ``;
let home_css = ``;
let login_page = ``;
let login_js = ``;
let list_js = ``;
async function loadFiles(params) {
    home_html = await fs.readFile(path.join(__dirname, '../home.html'), (err, data) => {
        if(err){
            console.log('unable to read home.html');
            return null;
            // console.log('error inhome.html');
        }
        console.log('reading home.html', data);
        return data;
    })
    home_js =  await fs.readFile(path.join(__dirname, '../home.js'), (err, data) => {
        if(err){
            console.log('unable to read home.js');
            return null;
        }
        console.log('reading home.js', data);
        return data;
    })
    home_css = await fs.readFile(path.join(__dirname, '../home.css'), (err, data) => {
        if(err){
            console.log('unable to read home.css');
            return null;
        }
        console.log('reading home.css', data);
        return data;
    });
    login_page = await fs.readFile(path.join(__dirname, '../login.html'), (err, data) => {
        if(err){
            console.log('unable to read login.html');
            return null;
        }
        console.log('reading login.html', data);
        return data;
    })
    login_js = await fs.readFile(path.join(__dirname, '../login.js'), (err, data) => {
        if(err){
            console.log('unable to read login.js');
            return null;
        }
        console.log('reading login.js', data);
        return data;
    })
    list_js = await fs.readFile(path.join(__dirname, '../list.js'), (err, data) => {
        if(err){
            console.log('unable to read list.js');
            return null;
        }
        console.log('reading list.js', data);
        // console.log('reading list.js', data);
        return data;
    });
}

// loadFiles().then( () => {
//     console.log(home_html + '\n ---------------------------------------------------------------------- \n' 
//         +  home_js + '\n ---------------------------------------------------------------------------- \n' 
//         +  home_css + '\n ----------------------------------------------------------------------------- \n' 
//         +  login_page + '\n ------------------------------------------------------------------- \n' 
//         +  login_js + '\n ------------------------------------------------------------------------- \n' 
//         +  list_js
//     );
// })
 

const app = express();
const cors = require('cors');
const middle = require('./middleman.js');
const {emailExists, authorized} = middle;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(400).send('Change ur url');
});



// app.get('/login', (req, res) => {
//     res.header = {     // this is incorrect
//         "Content-Type" : "text/html"
//     }
//     res.status(200).end(login_js)
// });

// This wouldnt wort,  coz how do we send login.js?

// Create public/
app.use(express.static(path.join(__dirname, "../../todo_withServer")));

app.get('/login{/}' , (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../login.html'));
});

app.post('/login{/}', 
    (req, res, next) => {
        // console.log('GOt a  post --- req = ', req);
        console.log('req.body ---- ', req.body)
        // res.setHeader('Content-Type', 'text/plain')
        // res.status(200).send('Response Sent');

        next();

    },
    (req, res, next)=>{
        let reqObj = req.body;
        if(authorized(reqObj.email, reqObj.pass).status){
            console.log('status = 0');
            res.setHeader("Content-Type" , "text/plain")
            // res.status(200).sendFile(path.join(__dirname, '../home.html'));   // this causes the error : SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
            // when you do a fetch POST request (like in your login flow), the fetch call only receives the response data (e.g., JSON or text) 
            // but does not automatically cause the browser to navigate to a new page. Fetch is designed for background HTTP requests, not for page navigation

            res.status(202).send({
                status : 0
            })
        }
        else if (authorized(reqObj.email, reqObj.pass).string === 'Exists'){
            console.log('status = 1');
            res.setHeader("Content-Type" , "application/json")
            res.status(300).send({
                status : 1
            })
        }  
        else if (authorized(reqObj.email, reqObj.pass).string === 'Not-exists') {
            console.log('status = 2');
            res.setHeader("Content-Type" , "application/json")
            res.status(300).send({
                status:2
            })
        }
    },
    (err, req, res, next) => {
        if(err) console.log(err);
        // do nothing for now

    }
);


app.get('/home', (req, res) => {
    res.status(202).sendFile(path.join(__dirname, '../home.html'));
})




const PORT  = 8899;
app.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Server running on PORT :${PORT}`);
})