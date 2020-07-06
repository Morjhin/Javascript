var personProto = {
    ageCalculator: function () {
        console.log(2020 - this.birthYear);
    }
};

var onur = Object.create(personProto);
onur.name = 'Onur';
onur.birthYear = 1998;
onur.job = 'student';

var cat = Object.create(personProto, {
    name: { value: 'Şanslı' },
    birthYear: { value: 2020 },
    job: { value: 'being cat' }

});