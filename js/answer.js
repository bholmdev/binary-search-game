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
const instructions = document.querySelector("#instructions");
const resetBtn = document.querySelector("#resetBtn");

startBtn.addEventListener("click", tryGuess);
/* If you are passing arguments to an event handler function as in the addEventListener calls below, you need to wrap it in a function expression or arrow function so that it doesn't fire when the addEventListener call is reached. You do not need to know about this for this assignment, but if you want to read about it, see the documentation here: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Event_listener_with_an_arrow_function */
yesBtn.addEventListener("click", () => isGuessCorrect(true));
noBtn.addEventListener("click", () => isGuessCorrect(false));
higherBtn.addEventListener("click", () => numIsHigher(true));
lowerBtn.addEventListener("click", () => numIsHigher(false));
resetBtn.addEventListener("click", reset);

toggleBtns([startBtn], true);

function tryGuess() {
  if (!nGuesses) {
    // first time guessing
    toggleBtns([startBtn], false);
    toggleBtns([guessBtn], true);
  }
  nGuesses++;
  currGuess = Math.floor((max - min) / 2) + min;
  console.log(
    `Guessing between ${min} and ${max} - guessing ${currGuess} - this is guess number ${nGuesses}`
  );
  guessBtn.textContent = currGuess + "!";
  instructions.textContent = "Am I correct?";
  toggleBtns([yesBtn, noBtn], true);
}

function toggleBtns(btnsArray, on) {
  for (let btn = 0; btn < btnsArray.length; btn++) {
    if (on) {
      btnsArray[btn].style.display = "inline-block";
    } else {
      btnsArray[btn].style.display = "none";
    }
  }
}

function isGuessCorrect(correct) {
  toggleBtns([yesBtn, noBtn], false);
  if (correct) {
    instructions.textContent = `I guessed your number in ${nGuesses} tries!`;
    toggleBtns([resetBtn], true);
  } else {
    if (max <= min) {
      outOfBounds();
    } else {
      toggleBtns([higherBtn, lowerBtn], true);
      instructions.textContent = `Is your number higher or lower than ${currGuess}?`;
    }
  }
}

function outOfBounds() {
  instructions.textContent = `OK, that is not possible. You either forgot your number or you're cheating. Game over!`;
  toggleBtns([resetBtn], true);
  toggleBtns([higherBtn, lowerBtn, yesBtn, noBtn], false);
}

function reset() {
  nGuesses = 0;
  currGuess = 0;
  max = 100;
  min = 1;
  toggleBtns([resetBtn, guessBtn], false);
  toggleBtns([startBtn], true);
  instructions.textContent =
    "Think of a number between 1-100 and click the blue button when you're ready.";
}

function numIsHigher(higher) {
  if (higher) {
    if (currGuess === 100) {
      outOfBounds();
      return;
    }
    min = currGuess + 1;
    console.log("Changing the minimum to: " + min);
  } else {
    if (currGuess === 1) {
      outOfBounds();
      return;
    }
    max = currGuess - 1;
    console.log("Changing the maximum to: " + max);
  }
  toggleBtns([higherBtn, lowerBtn], false);
  tryGuess();
}
