var display = document.getElementById("display");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var resetBtn = document.getElementById("resetBtn");

var seconds = 0;
var minutes = 0;
var hours = 0;
var timer = null;


function addLeadingZero(number) {
    if (number < 10) {
        return "0" + number;
    }
    return "" + number;
}

function updateDisplay() {
    var hDisplay = addLeadingZero(hours);
    var mDisplay = addLeadingZero(minutes);
    var sDisplay = addLeadingZero(seconds);

    display.textContent = hDisplay + ":" + mDisplay + ":" + sDisplay;
}

function addSecond() {
    seconds += 1;

    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }

    if (minutes === 60) {
        minutes = 0;
        hours += 1;
    }

    updateDisplay();
}

// Start / Pause button
startBtn.addEventListener("click", function () {
    if (timer === null) {
        timer = setInterval(addSecond, 1000);
        startBtn.src = "images/stop.png";
    } else {
        clearInterval(timer);
        timer = null;
        startBtn.src = "images/start.png";
    }
});

// Stop button
stopBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    startBtn.src = "images/start.png";
});

// Reset button
resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    startBtn.src = "images/start.png";

    seconds = 0;
    minutes = 0;
    hours = 0;

    updateDisplay();
});