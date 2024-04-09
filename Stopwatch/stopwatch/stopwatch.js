let startTime;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');


startStopBtn.addEventListener( 'click', () => {

    if(running){
    stopTimer();
}else{
    startTimer();
}
});


resetBtn.addEventListener('click', ()=> {
    resetTimer();
});

function startTimer() {
    startTime = Date.now() - (parseInt(display.textContent.replace(/:/g, '')) || 0);
    timerInterval = setInterval(updateTimer, 10);
    running = true;
    startStopBtn.textContent = 'Stop';
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
    startStopBtn.textContent = 'Start';
}

function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00';
    running = false;
    startStopBtn.textContent = 'Start';
}

function updateTimer() {
    const stoppedTime = Date.now() - startTime;
    const hours = Math.floor(stoppedTime / 3600000);
    const minutes = Math.floor((stoppedTime % 3600000) / 60000);
    const seconds = Math.floor((stoppedTime % 60000) / 1000);
    const milliseconds = Math.floor((stoppedTime % 1000) / 10);

    display.textContent = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + ':' + formatTime(milliseconds);
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}