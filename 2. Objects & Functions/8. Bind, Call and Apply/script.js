let mete = {
    name: 'Mete',
    age: 22,
    job: 'student',
    presentation: function (style, timeOfDay) {
        if (style === 'formal'){
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly'){
            console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

let lucky = {
    name: 'Şanslı',
    age: 0,
    job: 'cat'
};

mete.presentation('formal', 'midnight');
mete.presentation.call(lucky, 'friendly', 'morning');

let meteFriendly = mete.presentation.bind(mete, 'friendly');

meteFriendly('evening');

// Another example from 4th file
var years = [1998, 2003, 2005, 1881, 1923];

function arrayCalculator(arr, fn) {
    let arrRes = [];
    for (let i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calcAge(el) {
    return 2020 - el;
}

function isFullAge(limit, el) {
    return  el >= limit;
}

let ages = arrayCalculator(years, calcAge);
let fullAge = arrayCalculator(ages, isFullAge.bind(this, 20));

console.log(fullAge);