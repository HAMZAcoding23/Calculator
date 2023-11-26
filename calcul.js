const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equal = document.querySelector("[data-equal]");
const ac = document.querySelector("[data-all-clear]");
const del = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


class Calculator {
    currentOperandTextElement = null; //this is an object which is a pointer as an array
    previousOperandTextElement = null; // ......
    currentOperand = ''; //this is the current operand in a string format
    previousOperand = '';
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
    }

    delete(){
        if(this.currentOperand==''){
            this.currentOperand=this.previousOperand;
            this.previousOperand = '';
            this.operation = '';
        }
        else
            this.currentOperand = this.currentOperand.slice(0,-1);
    }

    appendNumber(number){
        if(number=='.' && this.currentOperand.includes('.'))
            return ;
        this.currentOperand = this.currentOperand + number;
    }

    chooseOperation(operation){
        if(this.currentOperand === '')
            return;
        if(this.previousOperand !==''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand + this.operation;

    }

    compute(){
        let computation ;
        const prevNumber = parseFloat(this.previousOperand);
        const currNumber = parseFloat(this.currentOperand);
        if(isNaN(prevNumber) || isNaN(currNumber))
            return ;
        switch(this.operation) {
            case '+' :
                computation = prevNumber + currNumber;
                break;
            
            case '-' :
                computation = prevNumber - currNumber;
                break;

            case'*' :
                computation = prevNumber * currNumber;
                break;

            case'/' :
                computation = prevNumber / currNumber;
                break;

            default :
                return ;
        }
        this.currentOperand = computation.toString();
        this.previousOperand = '';
        this.operation = '';
    }
}

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(operation => {
    operation.addEventListener("click",() => {
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    });
});

equal.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

del.addEventListener("click",() => {
    calculator.delete();
    calculator.updateDisplay();
});

ac.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});
