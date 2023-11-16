let display = document.getElementById("display");
let scientificMode = false;
let degreeMode = true;

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    display.value += operator;
}

function appendDecimal() {
    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

function appendParenthesis(parenthesis) {
    display.value += parenthesis;
}


// Function for calculating sin value
function cal_sin(n) {
    var accuracy = 0.0001, denominator, sinx, sinval;

    // Converting degrees to radian
    n = n * (Math.PI / 180.0);

    var x1 = n;

    // maps the sum along the series
    sinx = n;

    // holds the actual value of sin(n)
    sinval = Math.sin(n);
    var i = 1;
    do {
        denominator = 2 * i * (2 * i + 1);
        x1 = -x1 * n * n / denominator;
        sinx = (sinx + x1);
        i = i + 1;
    } while (accuracy <= sinval - sinx);

    // Return the calculated sine value
    return sinx.toFixed(6); // Adjust precision as needed
}

// Function for calculating cos value
function cal_cos(n) {
    let accuracy = 0.0001, x1, denominator, cosx, cosval;

    // Converting degrees to radian
    n = n * (Math.PI / 180.0);

    x1 = 1;

    // maps the sum along the series
    cosx = x1;

    // holds the actual value of sin(n)
    cosval = Math.cos(n);
    let i = 1;
    do {
        denominator = 2 * i * (2 * i - 1);
        x1 = -x1 * n * n / denominator;
        cosx = cosx + x1;
        i = i + 1;
    } while (accuracy <= Math.abs(cosval - cosx));

    // Return the calculated cosine value
    return cosx.toFixed(5); // Adjust precision as needed
}

// Modify the appendFunction function
function appendFunction(func) {
    let currentValue = display.value;

    if (func === 'sqrt') {
        display.value += "Math.sqrt(";
    } else if (func === 'power') {
        display.value += "**";
    } else if (func === 'sin' || func === 'cos' || func === 'tan') {
        if (scientificMode && degreeMode) {
            // Use custom functions for sin and cos calculations
            if (func === 'sin') {
                display.value += `cal_sin(${currentValue})`;
            } else if (func === 'cos') {
                display.value += `cal_cos(${currentValue})`;
            } else {
                display.value += `${func.toUpperCase()}(${currentValue})`;
            }
        } else {
            display.value += `${func.toUpperCase()}(${currentValue})`;
        }
    } else if (func === 'log') {
        display.value += "Math.log10(";
    } else if (func === '1/x') {
        display.value += "1/(";
    } else if (func === 'pi') {
        display.value += "Math.PI";
    }
}




function clearDisplay() {
    display.value = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function toggleScientificMode() {
    scientificMode = !scientificMode;
    let scientificButtons = document.querySelectorAll(".scientific-function");
    for (let button of scientificButtons) {
        button.classList.toggle("hidden");
    }
}

function toggleDegreeMode() {
    degreeMode = !degreeMode;
}

function calculate() {
    let expression = display.value;

    if (degreeMode && scientificMode) {
        expression = expression.replace(/Sin\(/g, "Math.sin(Math.PI / 180 * ");
        expression = expression.replace(/Cos\(/g, "Math.cos(Math.PI / 180 * ");
        expression = expression.replace(/Tan\(/g, "Math.tan(Math.PI / 180 * ");
    }

    try {
        let result = eval(expression);
        display.value = result;
    } catch (error) {
        display.value = "Error";
    }
}
