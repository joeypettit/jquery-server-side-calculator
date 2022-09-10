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


    // apply logic to ensure incoming charactar was entered correctly, input rules
    // concatenate incoming charactar to global array keys as a string
    // return charactar as a string, or 'quit' if user input was bad
   checkAndPushChar(thisChar);

    // return out of function if input from user was bad
   if(thisChar === 'quit'){
    return;
   }else if(thisChar === '='){
    // put the function to POST object here

   }else{
    // append charactar to the dom
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
        return 'quit';
        // if calcObject.num1 already has a '.', ignore input of a second '.'
    } else if (calcObject.num1.includes('.') && calcObject.num2 ==='' && charToCheck === '.'){
        return 'quit';
        // if calcObject.num2 already has a '.', ignore input of a second '.'
    } else if (calcObject.num2.includes('.')  && charToCheck === '.'){
        return 'quit'
    }


    // ~~~~~~~~~~~~~~~~~~ num1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // if statement checks if an operator has been submitted to object. If operator
    // is not there, then this must be the first number ===> concatenate charToCheck to calcObject.num1
    if (calcObject.operator === '' && (charToCheck >= '0' && charToCheck <= '9')|| charToCheck === '.'){
        calcObject.num1 += charToCheck;
            console.log(charToCheck);
            console.log('updating num1', calcObject);
            return;
    }

    // ~~~~~~~~~~~~~~~~~ operator ~~~~~~~~~~~~~~~~~~~~~~~
        // check to see if charToCheck is operator, if it is assign in to calcObject.operator
        // reassigning prevents two operators from being used.
        if (charToCheck === '*' || charToCheck === '/' || charToCheck === '+' || charToCheck === '-'){
            calcObject.operator = charToCheck;
            console.log('updating operator', calcObject);
            return;
        }    

    // ~~~~~~~~~~~~~~~~ num2 ~~~~~~~~~~~~~~~~~~~~~~~
            // if operator is present, and charToCheck is number, then this must be second number
            // in the calculation, concatenate charToCheck to calcObject.num2
        if(calcObject.operator != '' && (charToCheck >= '0' && charToCheck <= '9' || charToCheck === '.')){
            calcObject.num2 += charToCheck;
            console.log('updating num2', calcObject.num2);
            return;
        } 
        
   
    } 



//     displayChar(char)

// function displayChar(char){


// }

// function clearCalculator(){
//     // clear and reset global object

//     // clear DOM
// }





// ~~~~~~~~~~ IF TIME ~~~~~~~~~~~
// -light up last key that was pressed on DOM.