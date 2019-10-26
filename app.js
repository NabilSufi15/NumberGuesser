/*
Game Function:
- player must guess a number between a min and max
- player gets a certain amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer if if lose
- let player choose to play again
*/

//Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guessBtn'),
    guessInput = document.querySelector('#guess-input');
    message = document.querySelector('.message');

//assign ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function (e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    console.log(guess);

    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //check if won
    if (guess === winningNum) {
        //game over- won

        gameOver(true, `${winningNum} is correct! YOU WIN!`);

    } else {
        //Wrong number
        guessesLeft--;

        if (guessesLeft === 0) {
            //game over- lost

            gameOver(false, `Game Over, you lost. The correct Number was ${winningNum}`);

        } else {
            // game continues- answer wrong

            //disable input
            guessInput.disabled = false;

            //change border green
            guessInput.style.borderColor = 'red';

            //set message
            setMessage(`${guess} is incorrect! you have ${guessesLeft} guesses left`, 'red');

            //clear input
            guessInput.value = '';
        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //disable input
    guessInput.disabled = true;

    //change border green
    guessInput.style.borderColor = color;

    //set text color
    message.style.color = color;

    //set message
    setMessage(msg);

    //play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

//get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}