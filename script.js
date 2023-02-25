const calculatorContainer = document.getElementById('calculator-container');
const digitsContainer = document.getElementById('digits');
const buttons = calculatorContainer.querySelectorAll('button'); // nodelist of all bbuttons

let statement = [];
let num = '';
let currentResults;


buttons.forEach(button => {
	button.addEventListener('click', () => {
		// if click digit, push into digit array
		if(button.parentElement.id == 'digits'){
			// clear if new number
			num += button.id;
			console.log('current Number is: ' + num)
		}

		//else if(statement.length == 1) statement.push(button.id);

		// click on operand or equals
		else if(button.parentElement.id == 'operands' || button.id == 'equals'){
			// push then clear number
			if(num != 0){
				statement.push(Number(num)); 
				num = ''; }

			// only push operand, no need to push equals
			if(button.id != 'equals') {statement.push(button.id)}; 



			// number - operand - operand/ ......equals
			// if you click another operand, check if statement already has number and operand
			// calculation will take place using digit by itself and first operand
			if(
				(button.parentElement.id == 'operands' && 
			typeof statement[0] == 'number' && 
			typeof statement[1] == 'string' &&
			typeof statement[2] == 'string') ||
			(button.id == 'equals' && 
			typeof statement[0] == 'number' &&
			typeof statement[1] == 'string' &&
			typeof statement[2] == 'undefined')
			) //if
			{
				console.log('hello');
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[0]))
				console.log('the current answer is: ' + currentResults); // display current results
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				num = '';
				if(button.id != 'equals') statement.push(button.id) //push new operand
			}

			// basic calculations
			if(button.id == 'equals' && typeof statement[2] == 'number' 
			|| (button.parentElement.id == 'operands' && statement.length >= 3)){
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[2])) //calculate results
				console.log('the current answer is: ' + currentResults); // display current results
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				num = '';
			}
		} //elseif operand or equals

		else if(button.id == 'clear-all'){ //clear entire array
			statement = [];
		}
		else if(button.id == 'clear-entry'){ //clear last entry
			statement.pop();
		}
		/*
		else {
			statement.push(button.id); 
		} */

		console.log(statement);
	}); //eventclicker
}); //foreach

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