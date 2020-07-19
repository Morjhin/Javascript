function retirement(retirementAge) {
    let a = ' years left to retirement';
    return function (birthYear) {
        let age = 2020 - birthYear;
        console.log((retirementAge - age) + a);
    }
}

let retirementUS = retirement(66);
let retirementTurkey = retirement(65);
let retirementIceland = retirement(67);

retirementUS(1998);
retirementTurkey(1998);
retirementIceland(1998);

retirement(60)(1996);

// Another example from 5th file
function interviewQuestion(job) {
    return function (name) {
        if (job === 'student'){
            console.log(name + ' Student\'s question?');
        } else if (job === 'officer'){
            console.log(name + ' Officer\'s question?');
        } else  {
            console.log('What do you do ' + name + '?');
        }
    }
}

interviewQuestion('student')('Mete');
interviewQuestion('officer')('Selene');
interviewQuestion('guitarist')('Anthony');