const calculatorContainer = document.getElementById('calculator-container');
const digitsContainer = document.getElementById('digits');
const buttons = calculatorContainer.querySelectorAll('button'); // nodelist of all bbuttons

let op = '';
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
			//console.log(statement);
			//statement.push(button.id)

			if(button.id == 'equals'){
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[2])) //calculate results
				console.log('the current answer is: ' + currentResults); // display current results
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				num = '';
			}

			console.log(statement)


			// number, operand, operand/equals
			// if statement[1] is not a number, then it is an operand or undefined
			//if(typeof statement[0] == 'number' && typeof statement[1] == 'string' &&
			 /*(button.parentElement.id == 'operands' || button.id == 'equals')
			 typeof statement[2] =='string'){
				console.log('you picked number, operand, then another operand or equals')
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[0]))
				console.log('the current answer after double string is: ' + currentResults);
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				num = '';
			}  */


			/*
			// when user clicks number, operand, then equal
			else if(button.id == 'equals' && statement.length == 2){
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[0]));
				statement.splice(0, 3, currentResults);
			} */

			/*
			if(button.id == 'equals'){
				console.log('calculating...')
				currentResults = operate(statement[1], Number(statement[0]), Number(statement[2])) //calculate results
				console.log('the current answer is: ' + currentResults); // display current results
				statement.splice(0, 3, currentResults); // remove previous elements from array, replaces index 0 w/ current results
				if(button.parentElement.id == 'operands') statement.push(button.id); // push new operand
			} */

		} //elseif operand or equals

		else if(button.id == 'clear-all'){ //clear entire array
			statement = [];
		}
		else if(button.id == 'clear-entry'){ //clear last entry
			statement.pop();
			console.log(statement)
		}
		/*
		else {
			statement.push(button.id); 
		} */

		//console.log(statement);
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