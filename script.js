const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equals');
const input = document.querySelector('.input');
const output = document.querySelector('.output');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

let inputStack = [];

//event listeners

clearBtn.addEventListener('click', function () {
    handleClear();
});

numbers.forEach((number) =>
    number.addEventListener('click', function (e) {
        input.innerText += e.target.innerText;
        inputStack.push(e.target.innerText);
    })
);

operators.forEach((operator) =>
    operator.addEventListener('click', function (e) {
        input.innerText += e.target.innerText;
        inputStack.push(e.target.innerText);
    })
);

equalsBtn.addEventListener('click', handleCalculate);

document.addEventListener('keydown', handleKeyPress);

// event listeners

function handleCalculate() {
    output.innerText = '';
    if (input.innerText.length === 0) return;

    const plusIndex = inputStack.indexOf('+');
    const minusIndex = inputStack.indexOf('-');
    const multiplyIndex = inputStack.indexOf('x');
    const divideIndex = inputStack.indexOf('/');
    const modIndex = inputStack.indexOf('%');

    if (plusIndex !== -1) doCalculate(plusIndex, 'add');
    if (minusIndex !== -1) doCalculate(minusIndex, 'subtract');
    if (multiplyIndex !== -1) doCalculate(multiplyIndex, 'multiply');
    if (divideIndex !== -1) doCalculate(divideIndex, 'divide');
    if (modIndex !== -1) doCalculate(modIndex, 'mod');
}

function doCalculate(index, operation) {
    const firstNumber = parseFloat(inputStack.slice(0, index).join(''));
    const secondNumber = parseFloat(inputStack.slice(index + 1).join(''));
    if (typeof firstNumber !== 'number' || typeof secondNumber !== 'number') return;
    //add new calcualtions
    switch (operation) {
        case 'add':
            output.innerText = firstNumber + secondNumber;
            break;
        case 'subtract':
            output.innerText = firstNumber - secondNumber;
            break;
        case 'multiply':
            output.innerText = firstNumber * secondNumber;
            break;
        case 'divide':
            output.innerText = (firstNumber / secondNumber).toFixed(5);
            break;
        case 'mod':
            output.innerText = firstNumber % secondNumber;
            break;
    }
}

function handleKeyPress(e) {
    console.log(e);
    if (e.code.indexOf('Shift') !== -1) return; //skip shift
    if (e.code.indexOf('Control') !== -1) return; //skp ctrl
    if (e.code.indexOf('Tab') !== -1) return; //skip tab
    if (e.code.indexOf('Alt') !== -1) return; //skip alt
    if (e.code.indexOf('CapsLock') !== -1) return; //skip caps
    if (e.keyCode === 13) {
        //enter key
        handleCalculate();
        return;
    }
    if (e.keyCode === 32) {
        //space
        handleClear();
        return;
    }
    if (e.keyCode === 8) {
        //backspace
        handleBackSpace();
        return;
    }
    inputStack.push(e.key);
    input.innerText = inputStack.join('');
}

function handleClear() {
    input.innerText = '';
    output.innerText = '';
    inputStack = [];
}

function handleBackSpace() {
    output.innerText = '';
    inputStack.pop();
    input.innerText = inputStack.join('');
}
