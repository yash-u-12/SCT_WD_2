class Stopwatch {
    constructor() {
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.millisecondsElement = document.getElementById('milliseconds');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapList = document.getElementById('lapList');

        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.interval = null;
        this.isRunning = false;
        this.lapCount = 1;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.lapBtn.addEventListener('click', () => this.lap());
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            this.lapBtn.disabled = false;
            
            this.interval = setInterval(() => {
                this.milliseconds++;
                
                if (this.milliseconds === 100) {
                    this.milliseconds = 0;
                    this.seconds++;
                    
                    if (this.seconds === 60) {
                        this.seconds = 0;
                        this.minutes++;
                    }
                }
                
                this.updateDisplay();
            }, 10);
        }
    }

    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.interval);
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.lapBtn.disabled = true;
        }
    }

    reset() {
        this.pause();
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        this.lapCount = 1;
        this.updateDisplay();
        this.lapList.innerHTML = '';
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        this.lapBtn.disabled = true;
    }

    lap() {
        if (this.isRunning) {
            const lapTime = `${this.formatTime(this.minutes)}:${this.formatTime(this.seconds)}:${this.formatTime(this.milliseconds)}`;
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${this.lapCount}: ${lapTime}`;
            this.lapList.insertBefore(lapItem, this.lapList.firstChild);
            this.lapCount++;
        }
    }

    updateDisplay() {
        this.minutesElement.textContent = this.formatTime(this.minutes);
        this.secondsElement.textContent = this.formatTime(this.seconds);
        this.millisecondsElement.textContent = this.formatTime(this.milliseconds);
    }

    formatTime(time) {
        return time.toString().padStart(2, '0');
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
}); 