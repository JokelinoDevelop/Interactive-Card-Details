let userInput = document.getElementById('userInput');
let cardNumberInput = document.getElementById('cardNumberInput');

const config = {
    'username': {
        required: true
    },

    'cardNumber': {
        required: true,
        number: true
    },

    'month': {
        required:true,
        number: true
    },

    'year': {
        required: true,
        number: true
    },

    'cvc': {
        required: true,
        number: true
    }
};


function realtimeChange(config){
    for(let input of Object.keys(config)){
        let element = document.querySelector(`input[name="${input}"`)
        element.addEventListener("input", () => {
            let name = element.getAttribute("name");
            let change = document.getElementById(`${name}`)
            change.innerText = element.value;
        })
    }
}

realtimeChange(config);

class Validator{
    constructor(config){
        this.elementsConfig = config;
        this.errors= {};

        this.generateErrors();
        this.inputListener();
        this.submit();
        this.continue();
    }
    generateErrors(){
        for(let field in this.elementsConfig){
            this.errors[field] = [];
        }
    }

    inputListener() {
        for(let input in this.elementsConfig){
            let element = document.querySelector(`input[name="${input}"]`);
             element.addEventListener("input",  this.validate.bind(this));
        }
    }

    submit(){
        let submitBtn = document.getElementById('submitBtn')
        submitBtn.addEventListener("click", () => {
            let flag = 1;

            let inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
               if(input.value === ''){
                flag= 0;
               }
            })

            for(let field in this.elementsConfig){
                if(this.errors[field].length !== 0){
                    flag = 0;
                    break;
                }
            }
            
            if(flag === 1){
                let submitForm = document.getElementById('submitForm');
                let inputForm = document.getElementById('inputForm');
                submitForm.style.display = "flex";
                inputForm.style.display = "none";
            }


        })
    }

    continue(){
        let continueBtn = document.getElementById('continueBtn');
        continueBtn.addEventListener("click", () => {
            let submitForm = document.getElementById('submitForm');
            let inputForm = document.getElementById('inputForm');
            submitForm.style.display = "none";
            inputForm.style.display = "flex";

            let inputs = document.querySelectorAll('input')
            inputs.forEach( input => {
                input.value = '';
            })

            document.location.reload();
        })
        
    }

    validate(e){

        let elFields = this.elementsConfig;

        let field = e.target;
        let fieldValue = field.value;
        let fieldName = field.getAttribute("name");

        this.errors[fieldName] = [];

        if(elFields[fieldName].required){
            if(fieldValue === ""){
                this.errors[fieldName].push("Can't be blank")
            }
        }

        if(elFields[fieldName].number){
            if(!(this.containsOnlyNumbers(fieldValue))){
                this.errors[fieldName].push('Wrong format, please enter numbers')
            }
        }

        this.populateErrors(this.errors);
    }

    populateErrors(errors){
        for(const el of document.querySelectorAll("li ul")){
            el.remove();
        }

        for(let key of Object.keys(errors)){
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            if(parentElement.className === "flex-input"){
                parentElement = parentElement.parentElement;
            }else{
                parentElement == document.querySelector(`input[name="${key}"]`).parentElement;
            }
            let errorsElement = document.createElement('ul');
            parentElement.appendChild(errorsElement);

            errors[key].forEach( error => {
                let li = document.createElement('li');
                li.innerText = error;
                li.classList.add('error');

                errorsElement.appendChild(li);
            })
        }
    }

    containsOnlyNumbers(str) {
        return /^\d+$/.test(str);
    }

}

let validator = new Validator(config);