const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".btn");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let resultShown = false;

// Update whatever is currently on screen
function updateDisplay(value) {
  display.textContent = value;
}

// Decide which number we are currently typing
function getActiveNumber() {
  return currentOperator === null ? firstNumber : secondNumber;
}

function setActiveNumber(value) {
  if (currentOperator === null) {
    firstNumber = value;
  } else {
    secondNumber = value;
  }
}

// Handle a digit button press (0-9)
function handleNumber(digit) {
  // If a result was just shown start fresh on new number entry
  if (resultShown) {
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    resultShown = false;
  }

  let active = getActiveNumber();

  // Avoid a bunch of useless leading zeros like 007
  if (active === "0") {
    active = digit;
  } else {
    active = active + digit;
  }

  setActiveNumber(active);
  updateDisplay(active);
}

// Handle the decimal point button
function handleDecimal() {
  if (resultShown) {
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    resultShown = false;
  }

  let active = getActiveNumber();

  // Prevent multiple decimals
  if (active.includes(".")) {
    return;
  }

  // If nothing typed yet, start with "0"
  active = active === "" ? "0." : active + ".";

  setActiveNumber(active);
  updateDisplay(active);
}

// Handle +, -, *,/
function handleOperator(operator) {
  // If the user picks an operator before typing a first number just ignore it
  if (firstNumber === "") {
    return;
  }

  // If an operator was already chosen but the second number isn't typed yet
  if (currentOperator !== null && secondNumber === "") {
    currentOperator = operator;
    return;
  }

  // If both numbers are ready, calculate first
  if (currentOperator !== null && secondNumber !== "") {
    calculateResult();
    firstNumber = display.textContent;
  }

  currentOperator = operator;
  secondNumber = "";
  resultShown = false;
}

// Perform the actual math
function calculateResult() {
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);
  let result;

  if (currentOperator === "+") {
    result = num1 + num2;
  } else if (currentOperator === "-") {
    result = num1 - num2;
  } else if (currentOperator === "*") {
    result = num1 * num2;
  } else if (currentOperator === "/") {
    if (num2 === 0) {
      updateDisplay("Error");
      resetCalculator();
      return;
    }
    result = num1 / num2;
  } else {
    return;
  }

  // Round off tiny floating point errors
  result = Math.round(result * 100000000) / 100000000;

  updateDisplay(result);
  firstNumber = result.toString();
  secondNumber = "";
  currentOperator = null;
  resultShown = true;
}

// Handle "=" button
function handleEquals() {
  if (currentOperator === null || secondNumber === "") {
    return;
  }
  calculateResult();
}

// Delete the last character typed
function handleDelete() {
  let active = getActiveNumber();
  active = active.slice(0, -1);
  setActiveNumber(active);
  updateDisplay(active === "" ? "0" : active);
}

// Reset everything back to the start
function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  resultShown = false;
  updateDisplay("0");
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (action === "number") {
      handleNumber(value);
    } else if (action === "decimal") {
      handleDecimal();
    } else if (action === "operator") {
      handleOperator(value);
    } else if (action === "equals") {
      handleEquals();
    } else if (action === "delete") {
      handleDelete();
    } else if (action === "clear") {
      resetCalculator();
    }
  });
});