var Person = function (name, birthYear, job) {
    this.name = name;
    this.birthYear = birthYear;
    this.job = job;
    this.ageCalculator = function () {
        console.log(2020 - this.birthYear);
    }
};

Person.prototype.lastName = 'Bey';

var onur = new Person('onurmete', 1994, 'ceo');
var bedia = new Person('Bedia', 1968, 'officer');
var efe = new Person('Efe', 2005, 'student');

console.log(onur.lastName, bedia.lastName, efe.lastName);

onur.ageCalculator();
bedia.ageCalculator();
efe.ageCalculator();