/* SCREEN DISP 
const displayScreen = document.getElementById('screen-disp');*/

/* BUTTONS */
const clearBtn = document.querySelector('#clear-btn');
const delBtn = document.getElementById('del-btn');
const convertBtn = document.getElementById('convert-btn');
const equalsBtn = document.getElementById('equal-btn');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operate');


/* Calculator Object */
class Calculator {
    constructor() {
        this.display = document.getElementById('screen-disp');
        this.currentNumber = '0';
        this.operator = null;
        this.num1 = null;
        this.num2 = null;
    }

    appendNumber(number){
        if(this.currentNumber === '0'){
            this.currentNumber = number.toString();
        } else {
            this.currentNumber += number.toString();
        }
        //if(this.display.innerText.length > 10){
        //    this.currentNumber = Math.exp(parseFloat(this.currentNumber)).toString();
        //}
        this.display.innerText = this.currentNumber;
        if(this.operator === null){
            this.num1 = parseFloat(this.currentNumber);
        } else {
            //this.display.innerText = this.operator + this.currentNumber;
            this.num2 = parseFloat(this.currentNumber);
        }
    }

    setOperator(operation){
        if (this.num1 === null) {
            this.num1 = parseFloat(this.currentNumber);
        }
        this.operator = operation;
        this.currentNumber = '0';
    }

    clear() {
        this.currentNumber = '0';
        this.operator = null;
        this.num1 = null;
        this.num2 = null;
        this.display.innerText = this.currentNumber;
    }

    convert() {
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
                result = this.num1;
                break;
            case '√':
                result = Math.sqrt(this.num1);
                break;
            default:
                return;
        }
        this.display.innerText = result;
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

/*displayScreen.addEventListener('input', (event) => {
    console.log('over the limit, baby');
    const maxLength = parseInt(displayScreen.getAttribute('maxlength'));
    const currentValue = displayScreen.innerText;
    if(currentValue.length > maxLength) {
        displayScreen.innerText = Math.E.toFixed(3);
    }
})*/