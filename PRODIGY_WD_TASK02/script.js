document.addEventListener('DOMContentLoaded', () => {
    let startTime, updatedTime, difference, tInterval, savedTime;
    let running = false;
    const timeDisplay = document.getElementById('time-display');
    const startPauseButton = document.getElementById('start-pause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapList = document.getElementById('lap-list');

    function startTimer() {
        if (!running) {
            startTime = new Date().getTime();
            tInterval = setInterval(getShowTime, 1);
            running = true;
            startPauseButton.textContent = 'Pause';
        } else {
            clearInterval(tInterval);
            savedTime = difference;
            running = false;
            startPauseButton.textContent = 'Start';
        }
    }

    function resetTimer() {
        clearInterval(tInterval);
        running = false;
        difference = 0;
        savedTime = 0;
        timeDisplay.textContent = '00:00:00';
        startPauseButton.textContent = 'Start';
        lapList.innerHTML = '';
    }

    function lapTime() {
        if (running) {
            const li = document.createElement('li');
            li.textContent = timeDisplay.textContent;
            lapList.appendChild(li);
        }
    }

    function getShowTime() {
        updatedTime = new Date().getTime();
        difference = (savedTime) ? updatedTime - startTime + savedTime : updatedTime - startTime;
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((difference % 1000) / 10);

        timeDisplay.textContent = 
            (hours < 10 ? '0' : '') + hours + ':' + 
            (minutes < 10 ? '0' : '') + minutes + ':' + 
            (seconds < 10 ? '0' : '') + seconds + ':' + 
            (milliseconds < 10 ? '0' : '') + milliseconds;
    }

    startPauseButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', lapTime);
});
