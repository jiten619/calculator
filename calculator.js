let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
const screen = document.querySelector(".screen");
// TODO:: remove

function buttonClick(value){
  if(isNaN(parseInt(value))){
     handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleMath(value){
  if(buffer === '0'){
    // do nothing
    return;
  }

  const intBuffer = parseInt(buffer);
  if(runningTotal === 0){
    runningTotal = intBuffer;
  }else {
    flushOpeartion(intBuffer)
  }

  previousOperator = value;
  buffer = '0';
}

function handleNumber(number){
  if(buffer === "0"){
    buffer = number;
  } else {
    buffer += number;
  }
}

function flushOpeartion(intBuffer){
    if(previousOperator === "+"){
        runningTotal += intBuffer;
    } else if (previousOperator === "-"){
        runningTotal -= intBuffer;
    } else if (previousOperator === "÷"){
        runningTotal /= intBuffer;
    } else if (previousOperator === "×"){
       runningTotal *= intBuffer;
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case "C":
            buffer = "0";
             break;
        case "=":
            if(previousOperator === null){
                return;
            }
            flushOpeartion(parseInt(buffer))
            previousOperator = null;
            buffer = "" + runningTotal;
            runningTotal = 0;
            break;
        case "←":
             if(buffer.length === 1){
                buffer = 0;
             }else {
                buffer = buffer.substring(0, buffer.length - 1);
             }
            break;
        case "+":
        case "-":
        case "÷":
        case "×":
             handleMath(symbol)
             break;

    }
}


function init(){
    document.querySelector('.calc-buttons')
      .addEventListener('click', function(event){
        buttonClick(event.target.innerText);
      })
}

function rerender (){
    screen.innerText = buffer;
}

init();

