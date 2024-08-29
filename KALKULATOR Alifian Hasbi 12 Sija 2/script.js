const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "=", "^"]; 
let output = "";

const evaluateExpression = (expression) => {
    try {
        expression = expression.replace(/(\d+)%/g, (match, p1) => p1 / 100);
        expression = expression.replace(/\^/g, '**');
        return Function(`'use strict'; return (${expression})`)();
    } catch (e) {
        return "Error";
    }
};

const calculate = (btnValue) => {
    display.focus();
    if (btnValue === "=" && output !== "") {
        output = evaluateExpression(output).toString();
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.slice(0, -1);
    } else {
        if (output === "" && specialChars.includes(btnValue) && btnValue !== "%") return;
        output += btnValue;
    }
    display.value = output;
};

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
