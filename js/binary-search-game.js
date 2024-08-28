let max = 100;
let min = 1;
let nGuesses = 0;
let currGuess = 0;

/* getElementById would be fine to use below as well instead of querySelector */
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const higherBtn = document.querySelector("#higherBtn");
const lowerBtn = document.querySelector("#lowerBtn");
const startBtn = document.querySelector("#startBtn");
const guessBtn = document.querySelector("#guessBtn");
const resetBtn = document.querySelector("#resetBtn");
const message = document.querySelector("#instructions");

startBtn.addEventListener("click", tryGuess);
yesBtn.addEventListener("click", rightGuess);
noBtn.addEventListener("click", wrongGuess);
higherBtn.addEventListener("click", numIsHigher);
lowerBtn.addEventListener("click", numIsLower);
resetBtn.addEventListener("click", reset);

toggleBtns([startBtn], true);

function tryGuess(){ 
    if (!nGuesses) { // first time guessing
        toggleBtns([startBtn], false);
        toggleBtns([guessBtn], true);
    }
    nGuesses++;    
    currGuess = Math.floor((max - min)/2) + min;
    console.log(`Guessing between ${min} and ${max} - guessing ${currGuess} - this is guess number ${nGuesses}`);
    guessBtn.textContent = currGuess + "!";
    message.textContent = "Am I correct?";
    toggleBtns([yesBtn, noBtn, resetBtn], true);
}

function toggleBtns(btnsArray, on) { 
    for (const btn of btnsArray) {
        if (on) {
            btn.style.display = "inline-block"; 
        } else {
            btn.style.display = "none";
        }
    }
}

function rightGuess() {
    toggleBtns([yesBtn, noBtn], false);
    message.textContent = `I guessed your number in ${nGuesses} tries! \nClick reset to play again!`;
}

function wrongGuess() {
    if(max <= min) {
        outOfBounds();
    } else{
        toggleBtns([yesBtn, noBtn], false);
        toggleBtns([higherBtn, lowerBtn], true);
        message.textContent = `Is your number higher or lower than ${currGuess}?`; 
    }  
} 

function outOfBounds() {
    instructions.textContent = `OK, that is not possible. You either forgot your number or you're cheating. Game over!`;
    toggleBtns([resetBtn], true);
    toggleBtns([higherBtn, lowerBtn, yesBtn, noBtn], false);
    return;
  }
  
function numIsHigher() {
    min = currGuess + 1;
    console.log("Changing the minimum to: " + min);
    toggleBtns([higherBtn, lowerBtn], false);
    tryGuess();
}

function numIsLower() {
    max = currGuess - 1;
    console.log("Changing the maximum to: " + max);
    toggleBtns([higherBtn, lowerBtn], false);
    tryGuess();
}

function reset() {
    max = 100;
    min = 1;
    nGuesses = 0;
    currGuess = 0;
    message.textContent = "Think of a number between 1-100 and click the blue button when you're ready.";
    toggleBtns([startBtn], true);
    toggleBtns([yesBtn, noBtn, higherBtn, lowerBtn, guessBtn, resetBtn], false);
    return;
}