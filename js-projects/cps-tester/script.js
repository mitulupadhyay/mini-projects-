let clickBox = document.querySelector("#click-box");

let displayTime = document.querySelector("#time-display");
let displayScore = document.querySelector("#score-display");
let displayCps = document.querySelector("#cps-display");

let status = document.querySelector("#status");

let timeButtons = document.querySelectorAll(".time-btn");


let count = 0;

let selectedTime = 5;
let time = selectedTime;

let start = false;
let cooldown = false;

let timer;


// Select Timer
timeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Dont allow the user to change time during test
        if (start === true || cooldown === true) {
            return;
        }

        selectedTime = Number(button.dataset.time);

        time = selectedTime;

        displayTime.textContent = `Time: ${selectedTime}`;


        // Remove active from all buttons
        timeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });


        // Add active to the  selected button
        button.classList.add("active");

    });

});


// Count Clicks
function countClick() {

    // Dont allow user click during cooldown
    if (cooldown === true) {
        return;
    }


    // click to start the test
    if (start === false) {

        startTest();

    }


    count++;

    displayScore.textContent = `Clicks: ${count}`;

    clickBox.style.backgroundColor = "green";
}


// Start Test
function startTest() {

    count = 0;

    time = selectedTime;

    start = true;


    displayScore.textContent = "Clicks: 0";

    displayTime.textContent = `Time: ${selectedTime}`;

    displayCps.textContent = "CPS: --";

    status.textContent = "Test Running! Click Fast ASAP";


    // countdown 
    timer = setInterval(function () {

        time--;

        displayTime.textContent = `Time: ${time}`;


        if (time === 0) {

            clearInterval(timer);

            start = false;

            calculateCps();

            status.textContent = "Test Finished!";

            clickBox.style.backgroundColor = "";


            // Start cooldown
            cooldown = true;


            setTimeout(function () {

                cooldown = false;

                status.textContent = "Select a time and click the box to start!";

            }, 2000);

        }

    }, 1000);

}


// Calculate CPS
function calculateCps() {

    let cps = count / selectedTime;

    displayCps.textContent = `CPS: ${cps.toFixed(2)}`;

}


clickBox.addEventListener("click", countClick);