const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = 0;
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
 //if operator pressed, don't addDecimal
 if(awaitingNextValue) return;

 //if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

//calculate the first and second values depanding on operator!
const calulate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

//operator
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //prevent multipal operator  
  if(operatorValue && awaitingNextValue) {
    operatorValue = operator;  
    return
  };

  //assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calulate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //Ready for next value, store
  awaitingNextValue = true;
  operatorValue = operator;
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal(inputBtn.value));
  }
});

function resetAll() {
  calculatorDisplay.textContent = "0";
  firstValue = 0;
  operatorValue = 0;
  awaitingNextValue = false;
}
clearBtn.addEventListener("click", resetAll);
