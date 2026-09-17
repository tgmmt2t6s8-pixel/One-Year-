const SECRET_PIN = "13102025";
let enteredPIN = "";
let attemptCount = 0;

function pressKey(num) {
    if (enteredPIN.length < 8) {
        enteredPIN += num;
        updateDots();
        if (enteredPIN.length === 8) {
            setTimeout(checkPIN, 200);
        }
    }
}

function clearPIN() {
    enteredPIN = "";
    updateDots();
}

function updateDots() {
    for (let i = 1; i <= 8; i++) {
        const dot = document.getElementById(`dot${i}`);
        if (i <= enteredPIN.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    }
}

function checkPIN() {
    attemptCount++;

    if (attemptCount === 1) {
        alert("❌ Cod incorect! Mai ai doar 2 încercări!");
        document.getElementById("pin-status").innerText = "⚠️ Mai ai 2 încercări!";
        clearPIN();
    } 
    else if (attemptCount === 2) {
        alert("❌ Cod incorect! Cadourile s-au blocat și nu le mai poți accesa! 🔒\n\nSistemul ți-a oferit totuși încă 2 încercări de salvare.");
        document.getElementById("pin-status").innerText = "⚠️ Cadouri blocate! Încercări de salvare: 2";
        clearPIN();
    }
    else if (attemptCount === 3) {
        alert("❌ Cod incorect! Mai ai 1 singură încercare de salvare!");
        document.getElementById("pin-status").innerText = "⚠️ Ultimul test! Bagă codul corect!";
        clearPIN();
    }
    else {
        if (enteredPIN === SECRET_PIN) {
            document.getElementById('screen-pin').classList.remove('active');
            document.getElementById('screen-gifts').classList.add('active');
        } else {
            alert("❌ Cod greșit! Mai încearcă!");
            clearPIN();
        }
    }
}

/* LOGICĂ PLAYER MUZICAL ȘI BARA DE DERULARE */
const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const vinyl = document.getElementById('vinyl-disk');
const progressFill = document.getElementById('progress-fill');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');

function openMusicModal() {
    document.getElementById('modal-music').classList.add('active');
}

function closeMusicModal() {
    document.getElementById('modal-music').classList.remove('active');
    audio.pause();
    playBtn.innerText = "▶";
    vinyl.classList.remove('spinning');
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
        vinyl.classList.add('spinning');
    } else {
        audio.pause();
        playBtn.innerText = "▶";
        vinyl.classList.remove('spinning');
    }
}

function skipTime(seconds) {
    audio.currentTime += seconds;
}

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + '%';
        currentTimeEl.innerText = formatTime(audio.currentTime);
        totalDurationEl.innerText = formatTime(audio.duration);
    }
});

progressBar.addEventListener('click', (event) => {
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const barWidth = progressBar.clientWidth;
    audio.currentTime = (clickPosition / barWidth) * audio.duration;
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
