$(document).ready(onReady);

// onReady Function
function onReady(){
    console.log('jq and js');
    buttonHandlers();




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
 
    // capture charactar associated with the button that was pushed
   let thisChar = $(event.target).data('char');

   // clear function: if thisChar is "c", then call calculator reset and return
   if(thisChar === 'c'){
    clearCalculator();
    return;
   }

   // equals function: send global object to server for calculation (POST)
   // recieve answer from server and append to DOM.
   if(thisChar === '='){
    // PUT POST HERE
    // RECIEVE ANSWER
    // Set answer to calcObject.num1
    // put answer in numDisplay in DOM
   }

   
    
    // apply logic to ensure incoming charactar was entered correctly (input rules)
    // concatenate incoming charactar to global array keys as a string
    // return charactar as a string, or 'quit' if user input was bad
   let charToAppend = checkAndPushChar(thisChar);

    // return out of function if input from user was bad
   if(charToAppend === 'quit'){
    console.log('in processChar, return out for incorrect input');
    return;
   } else {
     // append charactar to the dom
    $('#numDisplay').append(charToAppend);
   
   }
}



function checkAndPushChar(thisChar){
    // capture charactar from associated button on calculator  
    // ensure thisChar is a string so it concatenates correctly to object keys
    let charToCheck = String(thisChar);
 
    console.log('before operator check:', charToCheck);
    
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
    if((calcObject.num1[calcObject.num1.length - 1] === '.' || calcObject.num2[calcObject.num1.length] - 1 === '.') && charToCheck==="."){
        console.log('previous char was a "."');
        return 'quit';
        // if calcObject.num1 already has a '.', ignore input of a second '.'
    } else if (calcObject.num1.includes('.') && calcObject.num2 ==='' && charToCheck === '.'){
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

// receive all previous calculations from server
// clear history list on DOM
// append updated list
function appendHistory(){


}




// ~~~~~~~~~~ IF TIME ~~~~~~~~~~~
// -light up last key that was pressed on DOM.
// -style it up