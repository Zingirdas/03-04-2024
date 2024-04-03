const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const recordBtn = document.getElementById("recordBtn");

let startTime;
let timerInterval;
let recordedTimes = [];
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 10);
    }
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    const formattedTime = formatTime(elapsedTime);
    timerDisplay.textContent = formattedTime;
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    stopTimer();
    timerDisplay.textContent = '00:00:00:000';
    recordedTimes = [];
    updateRecordedTimes();
}

function recordTime() {
    if (isRunning) {
        const elapsedTime = Date.now() - startTime;
        const formattedTime = formatTime(elapsedTime);
        recordedTimes.push(formattedTime);
        updateRecordedTimes();
    }
}


function formatTime(time) {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor(time % 1000);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds, 3)}`;
}

function pad(value, length = 2) {
    return String(value).padStart(length, '0');
}

function updateRecordedTimes() {
    const recordedTimesContainer = document.getElementById('recordedTimes');
    recordedTimesContainer.innerHTML = '';
    recordedTimes.forEach(function (time) {
        const p = document.createElement('p');
        p.textContent = time;
        recordedTimesContainer.appendChild(p);
    });
}

// function clearRecordTimes() {
//     recordedTimes = [];
//     updateRecordedTimes();
// }

startBtn.onclick = startTimer;
stopBtn.onclick = stopTimer;
resetBtn.onclick = resetTimer;
recordBtn.onclick = recordTime;
