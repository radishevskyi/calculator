const state = {
    firstNumber: '',
    secondNumber: '',
    operator: null,
}

const calculatorResult = document.getElementById('value');
const numberButtons = document.querySelectorAll('.button-number');
const acButton = document.getElementById('ac');
const operatorsButtons = document.querySelectorAll('.button-operator');
const equalButton = document.getElementById('equal');
const commaButton = document.querySelector('.button-comma')
const percentButton = document.getElementById('percent')
const plusMinusButton = document.getElementById('plusMinus')

numberButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        let buttonContent = button.textContent;
        const {firstNumber, operator} = state;
        if (firstNumber) {
            if (operator) {
                const value = state.secondNumber + buttonContent
                state.secondNumber = +value;
                calculatorResult.textContent = value;
            } else {
                const value = state.firstNumber + buttonContent
                state.firstNumber = +value;
                calculatorResult.textContent = value;
            }
        } else {
            const value = state.firstNumber + buttonContent
            state.firstNumber = +value;
            calculatorResult.textContent = value;
        }
        console.log(state)
    });
});

operatorsButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const {firstNumber, secondNumber, operator, result} = state;
        state.operator = button.textContent;
        if (operator && firstNumber && secondNumber) {
            state.firstNumber = calculate(firstNumber, secondNumber, operator);
            state.secondNumber = '';
            calculatorResult.textContent = state.firstNumber;
        }
        console.log(state)
    })
})

function calculate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+' :
            return parseFloat(firstNumber) + parseFloat(secondNumber)
        case '–':
            return parseFloat(firstNumber) - parseFloat(secondNumber);
        case '×':
            return parseFloat(firstNumber) * parseFloat(secondNumber);
        case '÷':
            if (parseFloat(secondNumber) !== 0) {
                return parseFloat(firstNumber) / parseFloat(secondNumber);
            } else {
                return 'Error';
            }
        default:
            return;
    }
}

equalButton.addEventListener('click', function () {
    const {firstNumber, secondNumber, operator} = state;
    if (firstNumber && secondNumber && operator) {
        state.firstNumber = calculate(firstNumber, secondNumber, operator);
        state.secondNumber = '';
        state.operator = null;
    }
    calculatorResult.textContent = state.firstNumber;
    console.log(state)
})

acButton.addEventListener('click', function allClear() {
    state.firstNumber = '';
    state.secondNumber = '';
    state.operator = null;
    calculatorResult.textContent = '0';
});

percentButton.addEventListener("click", function () {
    const {firstNumber, secondNumber} = state;
    if (firstNumber && !secondNumber) {
        state.firstNumber = +firstNumber / 100;
        calculatorResult.textContent = state.firstNumber;
    } else {
        state.secondNumber = +firstNumber / 100 * +secondNumber;
        calculatorResult.textContent = state.secondNumber;
    }
    console.log(state)
})

commaButton.addEventListener('click', function () {
    const {firstNumber, secondNumber, operator} = state;
    if (!firstNumber && !secondNumber && !operator) {
        state.firstNumber = calculatorResult.textContent + '.';
        calculatorResult.textContent = state.firstNumber;
    }
    if (firstNumber && !secondNumber && !operator) {
        if (firstNumber.toString().includes('.')) {
            return;
        } else {
            state.firstNumber += '.';
            calculatorResult.textContent = state.firstNumber;
        }
    }
    if (firstNumber && secondNumber && operator) {
        if (secondNumber.toString().includes('.')) {
            return;
        } else {
            state.secondNumber += '.';
            calculatorResult.textContent = state.secondNumber;
        }
    }
    console.log(state)
})

plusMinusButton.addEventListener("click", function () {
    const {firstNumber, secondNumber} = state;
    if (firstNumber && !secondNumber) {
        state.firstNumber = -1 * firstNumber
        calculatorResult.textContent = state.firstNumber
    }
    if (firstNumber && secondNumber) {
        state.secondNumber = secondNumber * -1
        calculatorResult.textContent = state.secondNumber
    }
    console.log(state)
})








