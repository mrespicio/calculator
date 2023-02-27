const calculatorContainer = document.getElementById('calculator-container');
const buttons = calculatorContainer.querySelectorAll('button'); // nodelist of all buttons
const display = document.getElementById('display')

let statement = [];
let num = '';
let currentResults;

buttons.forEach(button => {
	button.addEventListener('click', () => {
		// if click digit, append to num
		if(button.parentElement.id == 'digits'){
			// if number in statement was calculated, clear it
			if(statement.length == 1) statement = [];
			num += button.id;
			console.log('current Number is: ' + num)
			display.append(`${button.id}`)
		}

		// click on operand or equals
		else if(button.parentElement.id == 'operands' || button.id == 'equals'){
			display.append(`${button.id}`);
			// push digit to array then clear number
			if(num != 0){
				statement.push(Number(num)); 
				num = ''; 
			}

			// only push operand, no need to push equals
			if(button.id != 'equals') {statement.push(button.id)}; 

			// number - operand - operand/equals
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
			){
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
		console.log(statement);
	}); //eventclicker
}); //foreach

const add = (a, b) =>  a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a/b;

function operate(operator, a, b){
	switch(operator){
		case '+':
			return add(a, b);
			break;
		case '-':
			return subtract(a, b);
			break;
		case 'x':
			return multiply(a, b);
			break;
		case '/':
			return divide(a, b);
			break;
	}
}