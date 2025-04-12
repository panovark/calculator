let buffer = "0";
let runningTotal = 0;
let previousOperator = null;
let isCalculated = false;
let numbersOnDisplay = document.querySelector(".numbers-on-display");

function buttonClick(value) {
  if (isNaN(value) === true) {
    handleSymbol(value);
  } else if (isNaN(value) === false) {
    handleNumber(value);
  }
  display();
}

function handleNumber(number) {
  if (isCalculated) {
    buffer = "";
    isCalculated = false;
  }
  
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function handleSymbol(symbol) {
  switch(symbol) {
    case "C":
      buffer = "0";
      break;
    case "←":
      buffer = buffer.slice(0, -1);
      if (buffer === "") {
        buffer = "0";
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      } 
      operatorLogic(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal.toString();
      runningTotal = 0;
      isCalculated = true;
      break;
    case "+":
    case "-":
    case "÷":
    case "×":
      handleMath(symbol);
      break;
    default:
      return;
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const bufferInt = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = bufferInt;
  } else {
    operatorLogic(bufferInt);
  }

  previousOperator = symbol;
  buffer = "0";
}

function operatorLogic(bufferInt) {
  switch(previousOperator) {
    case "+":
      runningTotal += bufferInt;
      break;
    case "-":
      runningTotal -= bufferInt;
      break;
    case "×":
      runningTotal *= bufferInt;
      break;
    case "÷":
      runningTotal /= bufferInt;
      break;
    default:
      return;
  }
}

function display() {
  numbersOnDisplay.innerText = buffer;
}

function init() {
  document
    .querySelector(".buttons")
    .addEventListener("click", function(event) {
      buttonClick(event.target.innerText);
    });
}

init();