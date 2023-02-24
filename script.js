const calculatorContainer = document.getElementById('calculator-container');
const buttons = calculatorContainer.querySelectorAll('button'); // nodelist of all bbuttons

let buttonA = 0;
let buttonB = 0;

buttons.forEach(button => {
	button.addEventListener('click', () => alert('hello!'))
});

function add(a, b){
	return a + b;
}

function subtract(a, b){
	return a - b;
}

function multiply(a, b){
	return a * b;
}

function divide(a, b){
	return a/b;
}

function operate(operator, a, b){
	switch(operator){
		case '+':
			add(a, b);
			break;
		case '-':
			subtract(a, b);
			break;
		case '*':
			multiply(a, b);
			break;
		case '/':
			divide(a, b);
			break;
	}
}

console.log(calculatorContainer);
