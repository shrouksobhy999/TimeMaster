let timerInterval;
let totalTime = 0;
let isPaused = false;

// Start button functionality
document.getElementById("startBtn").addEventListener("click", function () {
    if (!timerInterval && totalTime > 0) {
        startCountdown();
    }
});

// Pause button functionality
document.getElementById("pauseBtn").addEventListener("click", function () {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = true;
    }
});

// Reset button functionality
document.getElementById("resetBtn").addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    isPaused = false;
    document.getElementById("timeInput").value = "";
    document.getElementById("timerDisplay").textContent = "00:00";
    document.getElementById("timerDisplay").classList.remove("red");
});

// Input processing
document.getElementById("timeInput").addEventListener("input", function () {
    const input = this.value.split(":");
    if (input.length === 2 && !isPaused) {
        const minutes = parseInt(input[0], 10);
        const seconds = parseInt(input[1], 10);
        if (!isNaN(minutes) && !isNaN(seconds)) {
            totalTime = minutes * 60 + seconds;
            updateDisplay(totalTime);
        }
    }
});

// Function to start countdown
function startCountdown() {
    timerInterval = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            alert("Time's up!");
        } else {
            totalTime--;
            updateDisplay(totalTime);
        }
    }, 1000);
}

// Function to update timer display
function updateDisplay(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;

    // Color change when below 10 seconds
    if (seconds < 10) {
        document.getElementById("timerDisplay").classList.add("red");
    } else {
        document.getElementById("timerDisplay").classList.remove("red");
    }
}
