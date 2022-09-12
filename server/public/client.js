$(document).ready(onReady);

// onReady Function
function onReady(){
    console.log('jq and js');
    buttonHandlers();
    clearCalculator();

    // GET calculation history, updated history to DOM
    $.ajax({
        method: 'GET',
        url: '/getAnswerHistory'
    }).then( (response) =>{
        updateHistory(response);
    });
}

// global object which holds each calculation
let calcObject = {
    num1: '',
    num2: '',
    operator: ''
}



function buttonHandlers(){
    // number button handlers
    $('#one').on('click', processChar);
    $('#two').on('click', processChar);
    $('#three').on('click', processChar);
    $('#four').on('click', processChar);
    $('#five').on('click', processChar);
    $('#six').on('click', processChar);
    $('#seven').on('click', processChar);
    $('#eight').on('click', processChar);
    $('#nine').on('click', processChar);
    $('#zero').on('click', processChar);

    // operation button handlers
    $('#plus').on('click', processChar);
    $('#minus').on('click', processChar);
    $('#multiply').on('click', processChar);
    $('#divide').on('click', processChar);
    $('#equals').on('click', processChar);
    $('#dot').on('click', processChar);

    // clear button handler
    $('#clear').on('click', processChar);
}




function processChar(event){
 
    // capture charactar associated with the button that was pushed, store as variable
   let thisChar = $(event.target).data('char');

   // clear function: if thisChar is "c", then call clearCalculator and return
   if(thisChar === 'c'){
    clearCalculator();
    return;
   }

   // if last input is '=' then call equals function
   if(thisChar === '='){

    equals();
    // PUT POST HERE
    // RECIEVE ANSWER
    // Set answer to calcObject.num1
    // put answer in numDisplay in DOM
   }

   

   
    
    // call checkAndPushChar to ensure incoming charactar was entered correctly (input rules)
    // concatenate incoming charactar to global array keys as a string
    // return charactar as a string, or 'quit' if user input was bad
   let charToAppend = checkAndPushChar(thisChar);
    //    TEST: console.log(charToAppend);


   // identify last charactar appended to DOM, set to variable
   let lastCharInDOM = $('#numDisplay').text();
   lastCharInDOM = lastCharInDOM[lastCharInDOM.length - 1];
    //    TEST: console.log('lastCharInDOM', lastCharInDOM);


    // return out of function if input from user was bad
   if(charToAppend === 'quit'){
    return;

        // if charToAppend is an operator, and the previous input was also an operator
        // remove previous operator from the DOM and append the new one.
    } else if((lastCharInDOM === '*' || lastCharInDOM === '/' || lastCharInDOM === '+' || lastCharInDOM === '-') 
        && (charToAppend === '*' || charToAppend === '/' || charToAppend === '+' || charToAppend === '-')){
            // assign current displayed text to variable
            let displaySoFar = $('#numDisplay').text();
            console.log('display so far', displaySoFar);
        
            // remove last charactar (the operator) from text, assign new text to variable
            let updatedDisplay = displaySoFar.slice(0, -1);
            // concatenate most recent operator input to variable
            updatedDisplay += charToAppend;
            console.log('updatedDisplay', updatedDisplay);

            // clear display
            $('#numDisplay').empty();

            // append to DOM updatedDisplay with most recent operator input
            $('#numDisplay').append(updatedDisplay);
        } else 
     // append charactar to the dom
    $('#numDisplay').append(charToAppend);
   
}



function checkAndPushChar(thisChar){
    // capture charactar from associated button on calculator  
    // ensure thisChar is a string so it concatenates correctly to object keys
    let charToCheck = String(thisChar);

    console.log(calcObject);

    
    // ~~~~~~~~~~~~~~~ restrictions ~~~~~~~~~~~~~~~~~~~~~
    
    // if user begins with an operator, alert them to press a number instead,
    // return out of function.
    if(calcObject.num1 === '' && (charToCheck === '*' || charToCheck === '/' || charToCheck === '+' || charToCheck === '-' || charToCheck === '=')){
        alert('Please Type A Number First');
        return 'quit';
    } 

    // if second number is present, and user types in another operator, warn the user that
    // the calculator only accepts two numbers.
      if(calcObject.num2 != '' && (charToCheck === '*' || charToCheck === '/' || charToCheck === '+' || charToCheck === '-')){
        alert('This Calculator Only Accepts Two Numbers');
        return 'quit';
    }




    // check if previous charToCheck was a '.', if it was ignore input of a second '.'
    if(((calcObject.num1[calcObject.num1.length - 1] === '.') || calcObject.num2[calcObject.num1.length] - 1 === '.') && charToCheck==="."){
        console.log('previous char was a "."');
        return 'quit';
        // if calcObject.num1 already has a '.', ignore input of a second '.'
    } else if (calcObject.num1.includes('.') && calcObject.operator ==='' && charToCheck === '.'){
        console.log('num1 already has a "."');
        return 'quit';
        // if calcObject.num2 already has a '.', ignore input of a second '.'
    } else if (calcObject.num2.includes('.')  && charToCheck === '.'){
        console.log('num2 already has a "."');
        return 'quit';
    }


    // ~~~~~~~~~~~~~~~~~~ num1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // if statement checks if an operator has been submitted to object. If operator
    // is not there, then this must be the first number ===> concatenate charToCheck to calcObject.num1
    if (calcObject.operator === '' && ((charToCheck >= '0' && charToCheck <= '9')|| charToCheck === '.')){
        calcObject.num1 += charToCheck;
            console.log('updating num1', calcObject);
            return charToCheck;
    }

    // ~~~~~~~~~~~~~~~~~ operator ~~~~~~~~~~~~~~~~~~~~~~~
        // check to see if charToCheck is operator, if it is assign in to calcObject.operator
        // reassigning prevents two operators from being used.
        if (charToCheck === '*' || charToCheck === '/' || charToCheck === '+' || charToCheck === '-'){
            calcObject.operator = charToCheck;
            console.log('updating operator', calcObject);
            return charToCheck;
        }    

    // ~~~~~~~~~~~~~~~~ num2 ~~~~~~~~~~~~~~~~~~~~~~~
            // if operator is present, and charToCheck is number, then this must be second number
            // in the calculation, concatenate charToCheck to calcObject.num2
        if(calcObject.operator != '' && (charToCheck >= '0' && charToCheck <= '9' || charToCheck === '.')){
            calcObject.num2 += charToCheck;
            console.log('updating num2', calcObject);
            return charToCheck;
        } 
        
   
} 

// clear numDisplay on DOM and reset global object
function clearCalculator(){
    $('#numDisplay').empty();
    calcObject = {
        num1: '',
        num2: '',
        operator: ''
    }

}

// equals function sends current calcObject to server (POST)
// clear global calcObject
// GET request: recieve object containing calculatedHistory (array of objects) from server
// append answer key from last object in calculatedHistory to #numDisplay
// set num1 in calcObject to previous answer (so further calculation can be applied)
// appends #numDisplay with answer
// updates history on DOM by calling appendHistory
function equals(){
    $.ajax({
        method: 'POST',
        url: '/calculate',
        data: calcObject

    }).then((response) => {
        console.log('/calculate POST:', response);

        // GET request for answer history (with latest calulation)
        $.ajax({
            method: 'GET',
            url: '/getAnswerHistory'
        }).then( (response) =>{
            // response is an array of objects. 
            // array is the history of all previous calculation
            // Each object is a previous calculation:
            // response ===> [
            //       {answer: answer,
            //       fullCalc: this + this = that
            //       }];

            // set latest answer to a variable, ensure its a string
            let latestAnswer = String(response[response.length-1].answer);

            // empty global calcObject
            calcObject = {
                num1: '',
                num2: '',
                operator: ''
            }

            // set calcObject.num1 to latest answer
            // calcObject.num1 = latestAnswer;
            // console.log('latest answer: ', latestAnswer);

            // if screen is getting too crowded, clear screen before appending
            console.log('# of divs in display:', $('#numDisplay > div').length);

            if($('#numDisplay > div').length >= 3){
                $('#numDisplay').empty();
            }
            
            
            
            // append #numDisplay with latestAnswer
            $('#numDisplay').append(`<div class='answer'>${latestAnswer}</div>`);

            // call updateHistory to append history to DOM
            updateHistory(response);
        });
    })
}

// clear DOM history section
// append updated history list from incoming calc history array of objects
function updateHistory(historyArray){
    // empty history on DOM
    $('#history').empty();

    // append fullCalc key from each object in array as new list item
    $('#history').append(() =>{
        let appendString = '';
        for (let i = historyArray.length - 1; i >= 0; i--){
            appendString += `<li class = "calcList">${historyArray[i].fullCalc}</li>`;
        }
        return appendString;
    })

}
    
    
    



    // updated history on DOM, take response array as arguement




// receive all previous calculations from server
// clear history list on DOM
// append updated list



// ~~~~~~~~~~ IF TIME ~~~~~~~~~~~
// -light up last key that was pressed on DOM.
// -style it up

// -make it so integer answers dont have decimal with zeros (if statment in serverside calulator)
// -limit accuracy of calculator to two decimal places

