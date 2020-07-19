//primitives
var a = 31;
var b = a;
a = 69;
console.log(a, b);

// objects
var x = {
    name: 'lol',
    age: 420
};

var y = x;
x.age = 31;
console.log(x.age);
console.log(y.age);

// functions
var age = 22;
var x = {
    name: 'Mete',
    city: 'Ankara',
};

function change(a, b) {
    a = 420;
    b.city = 'istanbul';
}

change(age, x);
console.log(age, x);