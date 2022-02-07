console.log('Ваша отметка - 70 балла(ов)\nОтзыв по пункам ТЗ:\nВсе пункты выполнены полностью!');

import playlist from './playlist.js'; // импорт треклиста

const playArr = Object.keys(playlist); 

let playNum = 0;

let audio = new Audio(playlist[playArr[playNum]]['audio']);
document.querySelector(".track-name").textContent = playlist[playArr[playNum]]['track-name'];
document.querySelector(".track-artist").textContent = playlist[playArr[playNum]]['track-artist'];
document.querySelector(".cover").style.backgroundImage = `url(${(playlist[playArr[playNum]]['cover'])})`;

const audioPlayer = document.querySelector(".audio-player");
const coverTrack = document.querySelector(".cover");

// получить длительность трека

let getDurationTime = () => {
    audio.addEventListener(
        "loadedmetadata",
        () => {
            audioPlayer.querySelector(".duration-time").textContent = getTimeCodeFromNum(
                audio.duration
            );
        },
        false
    );
}

getDurationTime()

// кнопка играть-пауза

const bttnPlay = audioPlayer.querySelector(".bttn-play");
bttnPlay.addEventListener(
    "click",
    () => {
        if (audio.paused) {
            coverTrack.classList.add("increase");
            bttnPlay.classList.remove("play");
            bttnPlay.classList.add("pause");
            audio.play();
        } else {
            coverTrack.classList.remove("increase");
            bttnPlay.classList.remove("pause");
            bttnPlay.classList.add("play");
            audio.pause();
        }
    },
    false
);

// кнопки предыдущий и следующий трек

const bttnBack = audioPlayer.querySelector(".bttn-back");
const bttnNext = audioPlayer.querySelector(".bttn-next");

const playNext = () => {
    if (playNum >= 1) {
        playNum = 0;
    } else {
        playNum += 1;
    }
    audio.pause();
    audio = new Audio(playlist[playArr[playNum]]['audio']);
    document.querySelector(".track-name").textContent = playlist[playArr[playNum]]['track-name'];
    document.querySelector(".track-artist").textContent = playlist[playArr[playNum]]['track-artist'];
    document.querySelector(".cover").style.backgroundImage = `url(${(playlist[playArr[playNum]]['cover'])})`;
    coverTrack.classList.add("increase");
    bttnPlay.classList.remove("play");
    bttnPlay.classList.add("pause");
    audio.play();
    getDurationTime();
    buildAudioGraph();
};
bttnNext.addEventListener("click", playNext);

const playBack = () => {
    if (playNum <= 0) {
        playNum = playArr.length - 1;
    } else {
        playNum -= 1;
    }
    audio.pause();
    audio = new Audio(playlist[playArr[playNum]]['audio']);
    document.querySelector(".track-name").textContent = playlist[playArr[playNum]]['track-name'];
    document.querySelector(".track-artist").textContent = playlist[playArr[playNum]]['track-artist'];
    document.querySelector(".cover").style.backgroundImage = `url(${(playlist[playArr[playNum]]['cover'])})`;
    coverTrack.classList.add("increase");
    bttnPlay.classList.remove("play");
    bttnPlay.classList.add("pause");
    audio.play();
    getDurationTime();
    buildAudioGraph();
};
bttnBack.addEventListener("click", playBack);

// установка таймлайна

const timelineBar = audioPlayer.querySelector(".timeline-bar");

timelineBar.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timelineBar).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);

// время проигрывания трека

setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress-bar");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".progress-time").textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}, 500);

// секунды в формат 0:00

function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
        seconds % 60
    ).padStart(2, 0)}`;
};

// визуализация

var audioCtx = window.AudioContext || window.webkitAudioContext;

var canvas;
var audioContext, canvasContext;
var analyser;
var width, height;

var dataArray, bufferLength;

window.onload = function () {
    audioContext = new audioCtx();

    canvas = document.querySelector("#myCanvas");
    width = canvas.width;
    height = canvas.height;
    canvasContext = canvas.getContext('2d');

    buildAudioGraph();

    requestAnimationFrame(visualize);
};

function buildAudioGraph() {
    var mediaElement = audio;
    mediaElement.onplay = (e) => { audioContext.resume(); }

    // исправлено для политики автозапуска
    mediaElement.addEventListener('play', () => audioContext.resume());

    var sourceNode = audioContext.createMediaElementSource(mediaElement);

    // Создать узел анализатора
    analyser = audioContext.createAnalyser();

    // Попробуйте изменить на более низкие значения: 512, 256, 128, 64 ...
    analyser.fftSize = 128;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
}

function visualize() {
    // очистить canvas
    canvasContext.clearRect(0, 0, width, height);

    // Или используйте заливку RGBA, чтобы получить небольшой эффект размытия
    // canvasContext.fillStyle = 'rgba (0, 0, 0, 0.5)';
    // canvasContext.fillRect(0, 0, width, height);

    // Получить данные анализатора
    analyser.getByteFrequencyData(dataArray);

    // var barWidth = width / bufferLength;
    var barWidth = 35;
    var barHeight, heightScale;
    var x = 0;

    // значения изменяются от 0 до 256, а высота холста равна 100. Давайте изменим масштаб
    // перед отрисовкой. Это масштабный коэффициент
    heightScale = height / 128;

    for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];


        // canvasContext.fillStyle = 'rgb(' + (barHeight+0) + ',4,160)';
        canvasContext.fillStyle = 'black';
        barHeight *= heightScale;
        canvasContext.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

        // 2 - количество пикселей между столбцами
        x += barWidth - 2;
    }

    // вызовите снова функцию визуализации со скоростью 60 кадров / с
    requestAnimationFrame(visualize);

}