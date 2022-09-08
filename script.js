const inputs = document.querySelector(".inputs"),
    resetBtn = document.querySelector(".reset-btn"),
    hint = document.querySelector(".hint span"),
    typingInput = document.querySelector(".typing-input");

function randomWord() {
    //getting random object from wordList
    let randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    let word = randomObj.word; //getting word of random object
    console.log(word);

    hint.innerHTML = randomObj.hint;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

resetBtn.addEventListener("click", randomWord);