(function () {

    function Quiz (question, answers, correctAns) {
        this.question = question;
        this.answers = answers;
        this.correct = correctAns;
    }

    Quiz.prototype.displayQuestion = function () {
        console.log(this.question);
        for (let i = 0; i < this.answers.length; i++){
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Quiz.prototype.displayAnswer = function (ans, scoreTracker) {
        let score;
        if (ans === this.correct){
            console.log('Your answer is correct!');
            score = scoreTracker(true);
        } else {
            console.log('Your answer is wrong. Try again.');
            score = scoreTracker(false);
        }
        this.viewScore(score);
    }

    function scoreCalc(){
        let score = 0;
        return function (fact) {
            if (fact){
                score++;
            }
            return score;
        }
    }
    let scoreKeeper = scoreCalc();

    Quiz.prototype.viewScore = function(score){
        console.log('Your score is: ', score);
        console.log('                      ');
    }

    let question1 = new Quiz('What kind of pet is Şanslı?', ['cat', 'dog', 'bird', 'crocodile'], 0);
    let question2 = new Quiz('What do I do?', ['doctor', 'bartender', 'student'], 2);
    let question3 = new Quiz('Which girl is my favorite', ['melisa', 'elif', 'sena'], 1);
    let questions = [question1, question2, question3];

    let check = true;

    while (check){
        let n = Math.floor(Math.random() * questions.length)
        questions[n].displayQuestion();

        let answer = prompt('What is your answer?');
        if (answer !== 'exit') {
            questions[n].displayAnswer(parseInt(answer), scoreKeeper);
            check = true;
        } else {
            check = false;
        }

        if (check === false){
            break;
        }
    }
})();