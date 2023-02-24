const calculatorContainer = document.getElementById('calculator-container');
const buttons = calculatorContainer.querySelectorAll('button'); // nodelist of all bbuttons

let numA = 0;
let numB = 0;
let op = '';
let statement = [];
let currentResults;

buttons.forEach(button => {
	button.addEventListener('click', () => {  // put element in array
		if(button.id == 'equals'){ //calculate
			numA = Number(statement[0]);
			numB = Number(statement[2])
			currentResults = operate(statement[1], numA, numB)
			console.log('the current answer is: ' + currentResults)
			console.log('before modifying: ' + statement)
			statement.splice(0, 3, currentResults)
			console.log('after splicing: ' + statement)
		}
		statement.push(button.id);
		if(button.id == 'equals') statement.pop();
		console.log(statement);
		//console.log('the current answer is: ' + currentCalc)
	});
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
		case 'plus':
			return add(a, b);
			break;
		case 'minus':
			return subtract(a, b);
			break;
		case 'times':
			return multiply(a, b);
			break;
		case 'divided':
			return divide(a, b);
			break;
	}
}

console.log(operate('plus', 1, 5))