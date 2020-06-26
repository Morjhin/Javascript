/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dice1, previousDice1, diceDOM1, dice2, previousDice2, diceDOM2;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying){
        firstDice();
        secondDice();
        twiceSix();

        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying){
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        winningScore();
    }
});

document.querySelector('.btn-new').addEventListener('click' , init);

function init() {
    variables();
    removeDice();
    resetScores();
    resetRoundScores();
    playerNames();
    removeWinner();
    removeActive();
    addActive();
}

function nextPlayer() {
    switchPlayer();
    resetRoundScores();
    switchActivePlayer();
    removeDice();
}

function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
}

function switchActivePlayer() {
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function variables() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
}

function removeDice() {
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

function resetScores(){
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
}

function resetRoundScores(){
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
}

function playerNames(){
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
}

function removeWinner(){
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

function removeActive(){
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function addActive(){
    document.querySelector('.player-0-panel').classList.add('active');

}

function addWinner() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    removeDice();
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}

function winningScore() {
    let input = document.getElementById('final-score').value;
    let winningScore;
        if (input){
            winningScore = input
        } else{
            winningScore = 100
        }

        if (scores[activePlayer] >= winningScore){
            addWinner();
            gamePlaying = false;
        } else {
            nextPlayer();
        }
}

function firstDice() {
    dice1 = Math.floor((Math.random() * 6) + 1);
    diceDOM1 = document.querySelector('.dice1');
    diceDOM1.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
}

function secondDice() {
    dice2 = Math.floor((Math.random() * 6) + 1);
    diceDOM2 = document.querySelector('.dice2');
    diceDOM2.style.display = 'block';
    diceDOM2.src = 'dice-' + dice2 + '.png';
}

function twiceSix() {
    if (dice1 === 6 && previousDice1 === 6){
        document.getElementById('score-0').textContent = '0'
        nextPlayer();
    } else if (dice2 === 6 && previousDice2 ===6){
        document.getElementById('score-0').textContent = '0'
        nextPlayer();
    }
    previousDice1 = dice1;
    previousDice2 = dice2;
}