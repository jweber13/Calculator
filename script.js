
/* Buttons */
const clearBtn = document.querySelector('#clear-btn');
const delBtn = document.getElementById('del-btn');
const convertBtn = document.getElementById('convert-btn');
const equalsBtn = document.getElementById('equal-btn');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operate');


/* Calculator Object */
class Calculator {
    constructor() {
        this.display = document.getElementById('current-display');
        this.histDisplay = document.getElementById('hist-display');
        this.currentNumber = '0';
        this.operator = null;
        this.num1 = null;
        this.num2 = null;
    }

    appendNumber(number){
        if (this.currentNumber.length >= 10){
            return;
        }
        if(this.currentNumber === '0'){
            this.currentNumber = number.toString();
        } else {
            this.currentNumber += number.toString();
        }
        const MAX_DISPLAY_LENGTH = 9;
        if(this.currentNumber.length > MAX_DISPLAY_LENGTH) {
            this.display.innerText = parseFloat(this.currentNumber).toExponential(MAX_DISPLAY_LENGTH - 2);
        } else {
            this.display.innerText = this.currentNumber;
        }
        if(this.operator === null){
            this.num1 = parseFloat(this.currentNumber);
        } else {
            this.num2 = parseFloat(this.currentNumber);
            this.histDisplay.innerText = this.num1.toString() + this.operator + this.num2.toString();
        }
    }

    setOperator(operation){
        if (this.num1 === null) {
            this.num1 = parseFloat(this.currentNumber);
        }
        this.operator = operation;
        this.histDisplay.innerText = this.num1.toString() + operation;
        this.currentNumber = '0';
    }

    clear() {
        this.currentNumber = '0';
        this.operator = null;
        this.num1 = null;
        this.num2 = null;
        this.histDisplay.innerText = '';
        this.display.innerText = this.currentNumber;
    }

    convert() {
        console.log(`current number is: ${this.currentNumber}, num1 is ${this.num1} and num2 is ${this.num2}`)
        if(this.num2 === null){
            this.num1 *= -1;
            this.currentNumber = this.num1;
            this.display.innerText = this.currentNumber;
        } else {
            this.num2 *= -1;
            this.currentNumber = this.num2;
            this.display.innerText = this.currentNumber;
        }
        //console.log(`current number is: ${this.currentNumber}, num1 is ${this.num1} and num2 is ${this.num2}`)
    }

    exponentiantion(a,b) {
        let res = 1;
        for(let i=0;i<b;i++) {
            res *= a;
        }
        return res;
    }

    delete() {
        if(this.num2 === null){
            let num1Str = this.num1.toString();
            this.num1 = parseFloat(num1Str.substring(0, num1Str.length-1));
            if (isNaN(this.num1)) this.num1 = 0;
            this.currentNumber = this.num1;
            this.display.innerText = this.currentNumber;
        } else {
            let num2str = this.num2.toString();
            this.num2 = parseFloat(num2str.substring(0, num2str.length-1));
            if (isNaN(this.num2)) this.num2 = 0;
            this.currentNumber = this.num2;
            this.display.innerText = this.currentNumber;
        }
    }

    calculate(){
        let result;
        switch(this.operator){
            case '+':
                result = this.num1 + this.num2;
                break;
            case '-':
                result = this.num1 - this.num2;
                break;
            case '*':
                result = this.num1 * this.num2;
                break;
            case '/':
                result = this.num1 / this.num2;
                break;
            case '^':
                result = this.exponentiantion(this.num1, this.num2);
                break;
            case '√':
                result = Math.sqrt(this.num1);
                break;
            default:
                return;
        }
        if(result.toString().length > 10){
            this.display.innerText = result.toExponential(4);
        } else {
            this.display.innerText = result;
        }
        if(this.num2 != null){
            this.histDisplay.innerText = this.num1.toString() + this.operator + this.num2.toString() + "=";
        } else {
            this.histDisplay.innerText = this.operator;
        }
        this.num1 = result;
        this.num2 = null;
        this.operator = null;
        this.currentNumber = '0';
    }
}

myCalc = new Calculator();

/* Event Listeners */

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        myCalc.appendNumber(button.innerText);
    })
});

operatorBtns.forEach(operator => {
    operator.addEventListener('click', () => {
        myCalc.setOperator(operator.innerText);
    })
});

equalsBtn.addEventListener('click', () =>  myCalc.calculate() );
clearBtn.addEventListener('click', () => myCalc.clear() );
delBtn.addEventListener('click', () => myCalc.delete() );
convertBtn.addEventListener('click', () => myCalc.convert() );