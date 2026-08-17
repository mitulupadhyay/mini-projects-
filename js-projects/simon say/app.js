let gameseq = [];
let userseq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is started!!!");

        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 100);
}

function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 100);
}

function levelUp() {
    userseq = [];

    level++;

    h2.innerText = `Level ${level}`;

    // Generate a random color
    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];

    // Add new color to game sequence
    gameseq.push(randColor);

    // Play the complete sequence
    playSequence();
}

function playSequence() {
    let i = 0;

    let interval = setInterval(function () {
        let color = gameseq[i];

        let btn = document.querySelector(`.${color}`);

        btnFlash(btn);

        i++;

        if (i >= gameseq.length) {
            clearInterval(interval);
        }
    }, 600);
}

function checkAns() {
    let idx = userseq.length - 1;

    // Check if user latest button is correct
    if (userseq[idx] === gameseq[idx]) {

        // User completed the entire sequence
        if (userseq.length == gameseq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        // Game Over
        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b><br>Press Any Key to start`;

        document.querySelector("body").style.backgroundColor = "red";

        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

function btnPress() {
    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userseq.push(userColor);

    checkAns();
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}