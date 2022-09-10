// initiate express
const express = require('express');
const app = express();

// assign PORT
const PORT = 5000;

// functions
function getAnswer(object){
    // ~~~ INCOMING OBJECT ~~~
    // Object = {
    //     num1: '',
    //     num2: '',
    //     operator: ''
    // }
    let num1 = object.num1;
    let num2 = object.num2;
    let operator = object.operator;
    let answer = '';

    if(operator === '+'){
        answer = Number(num1) + Number(num2);
    } else if( operator === '-'){
        answer = Number(num1) - Number(num2);
    } else if( operator === '*'){
        answer = Number(num1) * Number(num2);
    } else if ( operator === '/'){
        answer = Number(num1) / Number(num2);
    }
    // return as a string and round to two decimal places
    return String(answer.toFixed(2));
}


// set up static file server
app.use(express.static('server/public'));

// turn on req.body
app.use(express.urlencoded({ extended: true }));


// ~~~~~~~~ POST REQUESTS ~~~~~~~~~~~
app.post('/calculate', (req, res) => {
    let answer = getAnswer(req.body);
    console.log(req.body);
    console.log('in /calculate, answer is:', answer);
    
})











// recieve values from object, calculate, and return answer


























// listen on PORT channel 5000
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})



