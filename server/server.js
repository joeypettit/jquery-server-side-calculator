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
    let theAnswer = '';

    if(operator === '+'){
        theAnswer = Number(num1) + Number(num2);
    } else if( operator === '-'){
        theAnswer = Number(num1) - Number(num2);
    } else if( operator === '*'){
        theAnswer = Number(num1) * Number(num2);
    } else if ( operator === '/'){
        theAnswer = Number(num1) / Number(num2);
    }
    // return an object with full calculation and answer
    let answerAndCalc = {answer: theAnswer, fullCalc: `${num1} ${operator} ${num2}`} ;
    return answerAndCalc;
}

// data

// calculated will be an array of objects {answer: 4, fullCalc: '2 + 2 = 4'}
let calculated = [];


// set up static file server
app.use(express.static('server/public'));

// turn on req.body
app.use(express.urlencoded({ extended: true }));


// ~~~~~~~~ POST REQUESTS ~~~~~~~~~~~
app.post('/calculate', (req, res) => {
    let answerAndCalc = getAnswer(req.body);
    calculated.push(answerAndCalc);
    console.log(req.body);
    console.log('in /calculate, answerAndCalc:', answerAndCalc);
    res.sendStatus(201);
})


// ~~~~~~~~ GET REQUESTS ~~~~~~~~~~

app.get('/getAnswer', (req, res) => {
    res.send()



})

// GET history object

// GET 










// recieve values from object, calculate, and return answer


























// listen on PORT channel 5000
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})



