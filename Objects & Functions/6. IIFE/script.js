function game() {
    let score = Math.random() * 10;
    console.log(score <3);
}
game();

(function () {
    var score = Math.random() * 10;
    console.log(score <3);
})();

(function (blush) {
    var score = Math.random() * 10;
    console.log(score < blush);
})(3);