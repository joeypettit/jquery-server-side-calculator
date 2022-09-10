// initiate express
const express = require('express');
const app = express();

// assign PORT
const PORT = 5000;

//Modules


// set up static file server
app.use(express.static('server/public'));

// turn on req.body
app.use(express.urlencoded({ extended: true }));



// let calcObject = {
//     num1: '',
//     num2: '',
//     operator: ''
// }
function stringToNum(object){
    let num1 = object.num1;
    let num2 = object.num2;
    let operator = object.operator;
    let answer = '';

    if(operator === '+'){
        answer = Number(num1) + Number(num2);
    }




}
















// object coming in













// listen on PORT channel 5000
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})



