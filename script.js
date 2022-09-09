const inputs = document.querySelector(".inputs"),
    hint = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess-left span"),
    wrongLetter = document.querySelector(".wrong-letter span"),
    resetBtn = document.querySelector(".reset-btn"),
    typingInput = document.querySelector(".typing-input");


let word, maxGuess, incorrectLetters = [], correctLetters = [];

function randomWord() {
    //getting random object from wordList
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomObj.word; //getting word of random object
    maxGuess = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];


    hint.innerText = randomObj.hint;
    guessLeft.innerText = maxGuess;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    //the pressed key is an alphabet and incorrect alphabet not twice
    if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {

        //if user letter found in the word
        if (word.includes(key)) {
            // console.log("Letter found");
            for (let i = 0; i < word.length; i++) {
                //showing matched letter in the input value
                if (word[i] === key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        }
        else {
            maxGuess--; //decrement of maxGuess by 1
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuess;
        wrongLetter.innerText = incorrectLetters;
    }

    typingInput.value = "";

    //user found all the letters correct
    setTimeout(() => {
        if (correctLetters.length === word.length) {
            alert(`Congratulations ! Word Found ! ${word.toUpperCase()}`);
            return randomWord(); //function call to reset word
        }
        else if (maxGuess < 1) {     //no more guess left
            alert("No more guess left !");
            for (let i = 0; i < word.length; i++) {
                //show correct word
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());