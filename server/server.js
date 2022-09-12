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

    // round answer to two decimal places
    if(Number.isInteger(theAnswer)){
        // do nothing

        // else round to 4 decimals
    } else{
        theAnswer = theAnswer.toFixed(4);
    }
    

    // return an object with full calculation and answer
    let answerAndCalc = {answer: theAnswer, fullCalc: `${num1} ${operator} ${num2} = ${theAnswer}`} ;

    //OUTPUT OBJECT
    // {answer: answer,
    //  fullCalc: this + this = that
    //  }


    return answerAndCalc;
}

// DATA
// calculated will be an array of objects {answer: '4', fullCalc: '2 + 2 = 4'}.
// calculator history will be built with this array.
let calculated = [];


// set up static file server
app.use(express.static('server/public'));

// turn on req.body
app.use(express.urlencoded({ extended: true }));


// ~~~~~~~~ POST REQUESTS ~~~~~~~~~~~
app.post('/calculate', (req, res) => {
    console.log('recieved POST request from client, req.body:', req.body);
    let answerAndCalc = getAnswer(req.body);
    calculated.push(answerAndCalc);
    console.log('calculated array is', calculated);
    res.sendStatus(201);
})


// ~~~~~~~~ GET REQUESTS ~~~~~~~~~~

app.get('/getAnswerHistory', (req, res) => {
    res.send(calculated);
})

// GET history object













// recieve values from object, calculate, and return answer


























// listen on PORT channel 5000
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})



