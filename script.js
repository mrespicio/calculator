const calculatorContainer = document.getElementById('calculator-container');
const digitsContainer = document.getElementById('digits');
const buttons = calculatorContainer.querySelectorAll('button'); // nodelist of all bbuttons

let op = '';
let statement = [];
let num = [];
let numA;
let numB
let currentResults;   

buttons.forEach(button => {
	button.addEventListener('click', () => {

		// when user clicks number, operand, then equal
		if(button.id == 'equals' && statement.length == 2){
			console.log('you clicked a number, operand, then equal');
			currentResults = operate(statement[1], Number(statement[0]), Number(statement[0]));
			statement.splice(0, 2, currentResults);
		}

		// when statement is ready to be calculated, with 3 values
		else if(button.id == 'equals' || 
			(button.parentElement.id == 'operands' && statement.length == 3)) { 
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[2])) //calculate results
				console.log('the current answer is: ' + currentResults); // display current results
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				if(button.parentElement.id == 'operands') statement.push(button.id);
		}

		else if(button.parentElement.id == 'operands' && statement.length == 2){
			currentResults = operate(statement[1], Number(statement[0]), Number(statement[0]));
			statement.splice(0, 2, currentResults);
			statement.push(button.id);
			console.log('you clicked: ' + button.id)
			console.log('the results are: ' + currentResults);
			console.log('clicked two operands back to back')
		}

		else if(button.id == 'clear-all'){ //clear entire array
			statement = [];
		}
		else if(button.id == 'clear-entry'){ //clear last entry
			statement.pop();
			console.log(statement)
		}
		else {
			statement.push(button.id); 
		}
		console.log(statement);
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