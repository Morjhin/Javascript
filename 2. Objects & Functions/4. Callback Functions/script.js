var years = [1998, 2003, 2005, 1881, 1923];

function arrayCalculator(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calcAge(el) {
    return 2020 - el;
}

function isFullAge(el) {
    return  el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    }else{
        return -1;
    }
}

var ages = arrayCalculator(years, calcAge);
var fullAge = arrayCalculator(ages, isFullAge);
var heartRate = arrayCalculator(ages, maxHeartRate);

console.log(ages, fullAge, heartRate);