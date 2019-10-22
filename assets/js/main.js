
//selectors
const buttons = document.querySelectorAll('.drink-machine__option');
const machineScreen = document.querySelector('.drink-machine__screen');
const displayMessage = document.querySelector('.drink-machine__message');
const pouringLiquid = document.querySelector('.drink-machine__pouring');
const machineCup = document.querySelector('.drink-machine__cup');
const drinkFilling = document.querySelector('.drink-machine__filling');
let displayMessageContent = '';

class Drink {
    constructor(drinkName, baseIngr, additionalIngr) {
        this.drinkName = drinkName;
        this.baseIngr = baseIngr;
        this.additionalIngr = additionalIngr;
        this.steps = [];
    }

    isSelected() {
        displayMessageContent = `${this.drinkName} selected`;
    }

    boilWater() {
        displayMessageContent = 'Boiling water';
        displayMessage.classList.add('drink-machine__message--active');
    }

    pourDrink() {
        pouringLiquid.classList.add('drink-machine__pouring--active');
        drinkFilling.classList.add('drink-machine__filling--active');
        displayMessageContent = `Pouring ${this.drinkName} in the cup`;
    }

    addIngredients() {
        displayMessageContent = `Adding ${this.additionalIngr}`;
    }

    isReady() {
        displayMessageContent = `Your ${this.drinkName} is ready!`;
        displayMessage.classList.remove('drink-machine__message--active');
    }

    reset() {
        pouringLiquid.classList.remove('drink-machine__pouring--active');
        drinkFilling.classList.remove('drink-machine__filling--active');
        machineScreen.classList.remove('drink-machine__screen--active');
        pouringLiquid.classList.remove('drink-machine__pouring--orange')
        drinkFilling.classList.remove('drink-machine__filling--orange');
        displayMessageContent = "Select a drink";
    }

    makeDrink() {

        let index = 0;

        const callMethod = () => {
            if (index < this.steps.length) {
                this.steps[index]();
                displayMessage.innerHTML = displayMessageContent;
            }
            setTimeout(callMethod, 3000);
            index++;
        }
    
        callMethod();
    }
}

class Tea extends Drink {
    constructor(drinkName, baseIngr, additionalIngr) {
        super();
        this.drinkName = drinkName;
        this.baseIngr = baseIngr;
        this.additionalIngr = additionalIngr;
        this.steps = [
            () => this.isSelected(),
            () => this.boilWater(),
            () => this.steepWaterInTea(),
            () => this.pourDrink(),
            () => this.addIngredients(),
            () => this.isReady(),
            () => this.reset()
        ]
    }

    steepWaterInTea() {
        displayMessageContent = `Steeping water in the ${this.baseIngr}`;
    }
}

class Coffee extends Drink {
    constructor(drinkName, baseIngr, additionalIngr) {
        super();
        this.drinkName = drinkName;
        this.baseIngr = baseIngr;
        this.additionalIngr = additionalIngr;
        this.steps = [
            () => this.isSelected(),
            () => this.boilWater(),
            () => this.brewCoffeeGrounds(),
            () => this.pourDrink(),
            () => this.addIngredients(),
            () => this.isReady(),
            () => this.reset()
        ]
    }
    brewCoffeeGrounds() {
        displayMessageContent = `Brewing the coffee grounds`;
    }
}

class Chocolate extends Drink {
    constructor(drinkName, baseIngr) {
        super();
        this.drinkName = drinkName;
        this.baseIngr = baseIngr;
        this.steps = [
            () => this.isSelected(),
            () => this.boilWater(),
            () => this.addChocolatePowder(),
            () => this.pourDrink(),
            () => this.isReady(),
            () => this.reset()
        ]
        
    }
    addChocolatePowder() {
        displayMessageContent = `Adding ${this.baseIngr} to the water`;
    }
}

let lemonTea = new Tea('Lemon tea', 'tea', 'lemon');
let coffee = new Coffee('Coffee', 'coffee', 'sugar and milk');
let chocolate = new Chocolate('Chocolate', 'chocolate powder');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        machineScreen.classList.add('drink-machine__screen--active');

        if(button.matches('.tea')) {
            lemonTea.makeDrink();
            pouringLiquid.classList.add('drink-machine__pouring--orange')
            drinkFilling.classList.add('drink-machine__filling--orange');
        }
        if(button.matches('.coffee')) {
            coffee.makeDrink();
        }
        if(button.matches('.chocolate')) {
            chocolate.makeDrink();
        }
    })
})