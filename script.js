const calculatorContainer = document.getElementById('calculator-container');
const buttons = calculatorContainer.querySelectorAll('button'); // nodelist of all buttons
const display = document.getElementById('display');
const answer = document.getElementById('answer-display');

let statement = [];
let num = '';
let currentResults;
let displayText = '';

buttons.forEach(button => {
	button.addEventListener('click', () => {
		// if click digit, append to num
		if(button.parentElement.id == 'digits'){
			// if number in statement was calculated, clear it
			if(statement.length == 1 || typeof statement[0] =='string'){
				display.innerText = '';
				statement = [];
			}
			num += button.id; // create number
		}

		// click on operand or =
		else if(button.parentElement.id == 'operands' || button.id == '='){
			// push digit to array then clear number
			if(num !== ''){
				statement.push(Number(num)); 
				num = ''; 
			}

			// only push operand, no need to push =
			if(button.id != '=') {statement.push(button.id)}; 

			// number - operand - operand/=
			// if you click another operand, check if statement already has number and operand
			// calculation will take place using digit by itself and original operand
			if(
			(button.parentElement.id == 'operands' && 
			typeof statement[0] == 'number' && 
			typeof statement[1] == 'string' &&
			typeof statement[2] == 'string') ||
			(button.id == '=' && 
			typeof statement[0] == 'number' &&
			typeof statement[1] == 'string' &&
			typeof statement[2] == 'undefined')
			){
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[0]));
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				num = '';

				//push and display new operand
				if(button.id != '=') statement.push(button.id) 
			}

			// basic calculations
			if(button.id == '=' && typeof statement[2] == 'number' 
			|| (button.parentElement.id == 'operands' && statement.length >= 3)
			){
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[2])) //calculate results
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				num = '';
			}
		} //elseif operand or =

		else if(button.id == 'clear-all'){ //clear entire array
			statement = [];
			display.innerText = '';
			answer.innerText = '';
		}
		else if(button.id == 'clear-entry'){ //clear last entry
			statement.pop();
			//num = num.substring(0, num.length-1);
			display.removeChild(display.lastElementChild);
			//display.innerText = display;
		}

		if(button.id != 'clear-all' && button.id != 'clear-entry'){
			display.append(button.id);
		} 

		if(typeof currentResults != 'undefined'){
			console.log('the answer is' + currentResults);
			display.append(currentResults);
			answer.innerText = currentResults;
			currentResults = '';
		} 

		display.append(displayText);
		console.log('the current number to push is ' + num);
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
			if(b == 0) return 'you cannot divide by 0!'
			return Math.round(divide(a, b) * 100) / 100;
			break;
	}
}