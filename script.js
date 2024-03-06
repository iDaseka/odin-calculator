const displayValue = document.getElementById('result');
let n1 = '';
let n2 = '';
let operator = '';

function updateDisplay() {
    let result = n2 || n1 || '0';

    if (!result.includes('.')) {
        result = parseFloat(result).toFixed(0);
    }

    displayValue.innerHTML = result;
}

function clear() {
    n1 = '';
    n2 = '';
    operator = '';
    updateDisplay();
}

function operate() {
    if (n1 === '' || operator === '' || n2 === '') {
        return;
    }

    
    switch (operator) {
        case '+':
            n1 = (parseFloat(n1) + parseFloat(n2)).toFixed(2);
            break;
        case '-':
            n1 = (parseFloat(n1) - parseFloat(n2)).toFixed(2);
            break;
        case '*':
            n1 = (parseFloat(n1) * parseFloat(n2)).toFixed(2);
            break;
        case '/':
            if (parseFloat(n2) === 0) {
                n1 = 'Error';
            } else {
                n1 = (parseFloat(n1) / parseFloat(n2)).toFixed(2);
            }
            break;
        default:
            break;
    }

    operator = '';
    n2 = '';
    updateDisplay();
}

document.querySelectorAll('.num').forEach(button => {
    button.addEventListener('click', () => {
        if (button.dataset.value === '.') {
            if (operator === '' && !n1.includes('.')) {
                n1 += button.dataset.value;
            } else if (operator !== '' && !n2.includes('.')) {
                n2 += button.dataset.value;
            }
        } else {
            if (operator === '') {
                n1 += button.dataset.value;
            } else {
                n2 += button.dataset.value;
            }
        }
        updateDisplay();
    });
});

document.querySelectorAll('.op').forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.dataset.operator;
        if (buttonValue === 'clear') {
            clear();
        } else if (buttonValue === 'equal') {
            operate();
            updateDisplay();
        } else {
            if (operator !== '') {
                operate();
            }
            operator = buttonValue;
            updateDisplay();
        }
    });
});