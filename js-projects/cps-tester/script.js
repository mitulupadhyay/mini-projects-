let clickBox = document.querySelector("#click-box");

let displayTime = document.querySelector("#time-display");
let displayScore = document.querySelector("#score-display");
let displayCps = document.querySelector("#cps-display");

let status = document.querySelector("#status");


let count = 0;
let time = 5;

let start = false;
let cooldown = false;

let timer;


function countClick() {

    // user can't start the test again by mistake once it is done:-it will take 2 second to start again
    if (cooldown === true) {
        return;
    }


    // First click starts the test
    if (start === false) {
        startTest();
    }


    // click count
    count++;

    displayScore.textContent = `Clicks: ${count}`;

    clickBox.style.backgroundColor = "green";
}


function startTest() {

    count = 0;
    time = 5;

    start = true;

    displayScore.textContent = "Clicks: 0";
    displayTime.textContent = "Time: 5";
    displayCps.textContent = "CPS: --";

    status.textContent = "Test Running! Click Fast ASAP";


    timer = setInterval(function () {

        time--;

        displayTime.textContent = `Time: ${time}`;


        if (time === 0) {

            clearInterval(timer);

            start = false;

            calculateCps();

            status.textContent = "Test Finished!";

            clickBox.style.backgroundColor = "";


            // cooldown
            cooldown = true;

            setTimeout(function () {

                cooldown = false;

                status.textContent = "Click the box to try again!";

            }, 2000);
        }

    }, 1000);
}


function calculateCps() {

    let cps = count / 5;

    displayCps.textContent = `CPS: ${cps.toFixed(2)}`;
}


clickBox.addEventListener("click", countClick);