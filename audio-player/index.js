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


const playNext = () => { 
    if ( playNum >= 1) {
        playNum = 0;
    } else {
        playNum += 1 ;
    }
    console.log(playNum);
    audio.pause();
    audio = new Audio(audioArr[playNum]);
    audio.play();
};
bttnNext.addEventListener("click", playNext);

const playBack = () => { 
    if ( playNum < 0) {
        playNum = audioArr.length - 1;
    } else {
        playNum -= 1 ;
    }
    console.log(playNum);
    audio.pause();
    audio = new Audio(audioArr[playNum]);
    audio.play();
};
bttnBack.addEventListener("click", playNext);

