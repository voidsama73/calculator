let firstNumber = "";
let operator = "";
let secondNumber = "";

const clear = document.getElementById("clear");
const evaluate = document.getElementById("evaluate");
const del = document.getElementById("delete")
const dialpad = document.querySelectorAll(".dialpad");
const display = document.getElementById("output")
const notation = document.querySelectorAll(".notation")


//event to clear output screen
clear.addEventListener("click", clearScreen);
function clearScreen() {
  display.textContent = "";
  firstNumber = "";
  secondNumber = "";
  operator = "";
}

// event to display output when = is pressed
evaluate.addEventListener("click", displayOutput);

function displayOutput() {
  if (secondNumber == "") {
    display.textContent = firstNumber;
  }
  else {
    firstNumber = operate(firstNumber, operator, secondNumber).toString()
    operator = ""
    display.textContent = firstNumber + operator;
    secondNumber = "";
  }
}

// event to delete one character at a time

del.addEventListener("click", delChar);

function delChar() {
  if (operator == "" && secondNumber == "") {
    firstNumber = firstNumber.slice(0, -1);
  }
  else if (operator != "" && secondNumber == "") {

    operator = operator.slice(0, -1);
  }
  else {
    secondNumber = secondNumber.slice(0, -1);
  }
  display.textContent = firstNumber + operator + secondNumber;

}

//event for dialpad 
dialpad.forEach((item) => {
  item.addEventListener("click", displayInput);
});

function displayInput(e) {
  if (e.target.classList == "dialpad" && operator == "") {
    firstNumber = firstNumber + e.target.textContent;
    display.textContent = firstNumber;
  }
  else if (firstNumber != "" && e.target.classList.contains("operator") && secondNumber == "") {
    if (operator != "") {
      operator = operator.slice(0, -1);
      operator = e.target.textContent
      display.textContent = firstNumber + operator;

    }
    else {
      operator = e.target.textContent
      display.textContent = firstNumber + operator;


    }
  }
  else if (secondNumber != "" && e.target.classList.contains("operator")) {
    firstNumber = operate(firstNumber, operator, secondNumber)
    operator = e.target.textContent;
    display.textContent = firstNumber + operator;
    secondNumber = "";
  }
  else {
    if (e.target.classList.value == "dialpad") {
      secondNumber = secondNumber + e.target.textContent;
      display.textContent = firstNumber + operator + secondNumber;
    }
  }

}


notation.forEach((item) => {
  item.addEventListener("click", addNotation)
});

function addNotation() {
  if (this.id == "decimal") {
    if (firstNumber == "") {
      firstNumber = this.textContent
      display.textContent = firstNumber
    }

    else if (firstNumber != "" && operator == "") {
      firstNumber.includes(".") ? firstNumber : firstNumber = firstNumber + this.textContent;
      display.textContent = firstNumber
    }
    else {
      secondNumber.includes(".") ? secondNumber :
        secondNumber = secondNumber + this.textContent;
      display.textContent = firstNumber + operator + secondNumber
    }

  }
  else {

    if (firstNumber == "") {
      firstNumber = "-"
      display.textContent = firstNumber
    }
    else if (firstNumber != "" && operator == "") {
      firstNumber.includes("-") ? firstNumber = firstNumber.replace("-", "") : firstNumber = "-" + firstNumber;
      display.textContent = firstNumber

    }
    else {
      secondNumber.includes("-") ? secondNumber = secondNumber.replace("-", "") : secondNumber = "-" + secondNumber;
      display.textContent = firstNumber + operator + secondNumber;


    }

  }
}


function operate(number1, operator, number2) {
  let result = undefined

  switch (operator) {
    case "+":
      result = add(number1, number2);
      break;
    case "-":
      result = substract(number1, number2);
      break;
    case "X":
      result = mult(number1, number2);
      break;
    case "/":
      number1 % number2 == 0 ? result = division(number1, number2) : result = division(number1, number2).toFixed(4)
      break;
    case "%":
      result = percent(number1, number2);
      break;
    default:
      break;

  }
  return result;
}

function add(number1, number2) {
  return Number(number1) + Number(number2);
}
function substract(number1, number2) {
  return Number(number1) - Number(number2);
}
function division(number1, number2) {
  return Number(number1) / Number(number2);
}
function mult(number1, number2) {
  return Number(number1) * Number(number2);
}
function percent(number1, number2) {
  return ((Number(number1) / 100) * Number(number2));
}
