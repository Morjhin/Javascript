let DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage'
};

// BUDGET CONTROLLER
let budgetController = (function () {

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1
    };

    Expense.prototype.calcPercentage = function(totalIncome) {

        if (totalIncome > 0) {
            this.percentage = ((this.value / totalIncome) * 100).toFixed(1);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    function calculateTotal(type) {
        let sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        })
        data.totals[type] = sum;
    }

    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    let difference = function() {
        data.budget = data.totals.inc - data.totals.exp;
    };

    let percentage = function() {
        if (data.totals.inc > 0) {
            data.percentage = ((data.totals.exp / data.totals.inc) * 100).toFixed(1);
        } else {
            data.percentage = -1;
        }
    };

    let nodeListForEach = function(list, callback) {
        for (let i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new Item
            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            // Push it into out data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },

        deleteItem: function(type, id) {
            let ids, index;

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateTotal,
        difference,
        percentage,

        calculatePercentage: function() {
            data.allItems.exp.forEach(function (current) {
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentage: function() {
            let allPercentages;
            allPercentages = data.allItems.exp.map(function (current) {
                return current.getPercentage();
            });
            return allPercentages;
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        displayPercentage: function (percentages) {

            let fields = document.querySelectorAll(DOMStrings.expensesPercLabel);


            nodeListForEach(fields, function (current, index) {

                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                } if (percentages[index] >= 100.1) {
                    current.textContent = '>%100'
                }

            });

        },

        changeType: function() {
            let fields;
            fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function (current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        }

    };

})();

// UI CONTROLLER
let UIController = (function () {

    let formatNumber = function (number, type) {
        let numberSplit, int, dec;

        number = Math.abs(number);
        number = number.toFixed(3);
        numberSplit = number.split('.');

        int = numberSplit[0];
        if (int.length > 3 && int.length <= 6) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }else if (int.length > 6) {
            int = int.substr(0, int.length - 6) + ',' + int.substr(int.length - 6, 3) + ',' +
                int.substr(int.length - 3, 3);

        } // input 1234567, output 1,234567, output2 1,234,567

        dec = numberSplit[1];
        return (type === 'inc' ? '+' : '-') + ' ' + int + '.' + dec;
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: Number.parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },

        addList: function (obj, type) {
            let html, newHtml, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete">' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>' +
                    '</div>';
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">' +
                    '21%</div><div class="item__delete"><button class="item__delete--btn">' +
                    '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        deleteList: function(selectorID) {
            let elem = document.getElementById(selectorID)

            elem.parentNode.removeChild(elem);
        },

        clearFields: function() {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            fieldsArr =  Array.prototype.slice.call(fields); // Array.... uses for converting array to something

            fieldsArr.forEach(function (current) {
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            let type;
            obj.budget >= 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
            if (obj.percentage >= 100.1) {
                document.querySelector(DOMStrings.percentageLabel).textContent = '>%100';
            }

        }

    };

})();

// GLOBAL APP CONTROLLER
let controller = (function (budgetCont, UICont, DOMStr) {

    function eventListenerSetup() {
        document.querySelector(DOMStr.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOMStr.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOMStr.inputType).addEventListener('change', budgetController.changeType);
    }

    return {
        ctrlInit: function () {
            eventListenerSetup();
            UIController.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            getTime();
        }
    };

})(budgetController, UIController, DOMStrings);

controller.ctrlInit();

function ctrlAddItem() {
    let input, newItem;

    // Get input data
    input = UIController.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {

        // Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // Add the item to UI
        UIController.addList(newItem, input.type);

        // Clear fields
        UIController.clearFields();

        // Calculate and update budget
        budgetUpdate();

        // Calculate and update percentages
        updatePercentages();

    }

}

function budgetUpdate() {

    // Calculate the budget
    calculateBudget();

    // Return to the budget
    let budget = budgetController.getBudget();

    // Display the budget on the UI
    UIController.displayBudget(budget);

}

function calculateBudget() {

    // Calculate total income and expenses
    budgetController.calculateTotal('exp');
    budgetController.calculateTotal('inc');

    // Calculate income - expenses
    budgetController.difference();

    // Calculate the percentage of income that we spent
    budgetController.percentage();

}

function ctrlDeleteItem(event) {
    let itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);

        // Delete item from the data structure
        budgetController.deleteItem(type, ID);

        // Delete the item from the UI
        UIController.deleteList(itemID);

        // Update and show the budget
        budgetUpdate();

        // Calculate and update percentages
        updatePercentages();
    }
}

function updatePercentages() {
    let percentages;
    // Calculate percentages
    budgetController.calculatePercentage();
    // Read percentages from the budget
    percentages = budgetController.getPercentage();
    // Update the UI with the new percentages
    budgetController.displayPercentage(percentages);
}

function getTime() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
        "November", "December"];
    const d = new Date();
    document.querySelector('.budget__title--month').textContent = (months[d.getMonth()] + ' ' + d.getFullYear());
}