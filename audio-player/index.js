// const playlist = {
//     track1: {
//         'audio' : './assets/audio/beyonce.mp3',
//         'track-name' : 'Dont Hurt Yourself',
//         'track-artist' : 'Beyonce',
//         'cover' : './assets/img/lemonade.png',
//     },
//     track2: {
//         'audio' : './assets/audio/dontstartnow.mp3',
//         'track-name' : 'Dont Start Now',
//         'track-artist' : 'Dua Lipa',
//         'cover' : './assets/img/dontstartnow.png',
//     }
// }

// console.log(Object.keys(playlist.track1))
let playNum = 0;
const audioArr = ['./assets/audio/beyonce.mp3', './assets/audio/dontstartnow.mp3'];
console.log(audioArr[playNum]);

let audio = new Audio(audioArr[playNum]);
console.log(audio);
console.dir(audio);


const audioPlayer = document.querySelector(".audio-player");



const bttnPlay = audioPlayer.querySelector(".bttn-play");
bttnPlay.addEventListener(
    "click",
    () => {
        if (audio.paused) {
            bttnPlay.classList.remove("play");
            bttnPlay.classList.add("pause");
            audio.play();
        } else {
            bttnPlay.classList.remove("pause");
            bttnPlay.classList.add("play");
            audio.pause();
        }
    },
    false
);


const bttnBack = audioPlayer.querySelector(".bttn-back");
const bttnNext = audioPlayer.querySelector(".bttn-next");


let getDurationTime = () => {
    audio.addEventListener(
        "loadedmetadata",
        () => {
            audioPlayer.querySelector(".duration-time").textContent = getTimeCodeFromNum(
                audio.duration
            );
            //   audio.volume = .75;
        },
        false
    );
}

getDurationTime()


const playNext = () => {
    if (playNum >= 1) {
        playNum = 0;
    } else {
        playNum += 1;
    }
    audio.pause();
    audio = new Audio(audioArr[playNum]);
    audio.play();
    getDurationTime();
    console.log(durationTime);
};
bttnNext.addEventListener("click", playNext);

const playBack = () => {
    if (playNum < 0) {
        playNum = audioArr.length - 1;
    } else {
        playNum -= 1;
    }
    audio.pause();
    audio = new Audio(audioArr[playNum]);
    audio.play();
};
bttnBack.addEventListener("click", playBack);


const timelineBar = audioPlayer.querySelector(".timeline-bar");

timelineBar.addEventListener("click", e => {
    const timelineWidth = window.getComputedStyle(timelineBar).width;
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
    audio.currentTime = timeToSeek;
}, false);


setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress-bar");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".progress-time").textContent = getTimeCodeFromNum(
        audio.currentTime
    );
}, 500);


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
