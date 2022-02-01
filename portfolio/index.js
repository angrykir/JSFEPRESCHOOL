// Self-review

console.log('Ваша отметка - 83 балла(ов)\nОтзыв по пунктам ТЗ:\nЧастично выполненные пункты:\n1) секция video — 2 балл(а)');

// Close slide menu

const slideLink = document.querySelectorAll('.slide-link');
slideLink.forEach((el) => el.addEventListener('click', closeMenu));
function closeMenu(event) {
    if (event.target.classList.contains('slide-link')) {
        document.getElementById("slide-menu-checkbox").checked = false;
    }
};

// Changing portfolio images

const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioBtnArr = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-image');

function changeImage(event) {
    if (event.target.classList.contains('portfolio-btn')) {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index + 1}.jpg`);
    }
};
portfolioBtns.addEventListener('click', changeImage);

// Add class active portfolio

function changeClassActivePortfolio(event) {
    if (event.target.classList.contains('portfolio-btn')) {
        portfolioBtnArr.forEach((element) => element.classList.remove('active'));
    }
    event.target.classList.add('active');
};
portfolioBtns.addEventListener('click', changeClassActivePortfolio);

//Сaching images

// const seasons = ['winter', 'spring', 'summer', 'autumn'];

// function preloadSummerImages() {
//     for(let i = 1; i <= 6; i++) {
//       const img = new Image();
//       img.src = `./assets/img/summer/${i}.jpg`;
//     }
//   }
//   preloadSummerImages();

//Translate page

import i18Obj from './translate.js';

const ruLanguage = document.querySelector('.ru-language');
const enLanguage = document.querySelector('.en-language');

function getTranslate(language) {
    language.target === ruLanguage ? language = 'ru' : language = 'en';
    let dataI18Arr = document.querySelectorAll('[data-i18]');
    dataI18Arr.forEach((element) => {
        if (element.placeholder) {
            element.placeholder = i18Obj[language][element.dataset.i18];
            element.textContent = '';
            element.value = ''
        }
        element.textContent = i18Obj[language][element.dataset.i18];
    });
};

ruLanguage.addEventListener('click', getTranslate);
enLanguage.addEventListener('click', getTranslate);

// Add class active language

const langBtns = document.querySelector('.lang');
const langBtnsArr = document.querySelectorAll('.lang-link');

function changeClassActiveLang(event) {
    if (event.target.classList.contains('lang-link')) {
        langBtnsArr.forEach((element) => element.classList.remove('active'));
    }
    event.target.classList.add('active');
    gLang === 'en' ? gLang = 'ru' : gLang = 'en';
};
langBtns.addEventListener('click', changeClassActiveLang);

// Toggle theme

const skills = document.querySelector('.skills');
const portfolio = document.querySelector('.portfolio');
const video = document.querySelector('.video');
const price = document.querySelector('.price');
const themeToggle = document.querySelector('.theme-toogle');
const themeToggleArr = [skills, portfolio, video, price];

function changeTheme(event) {
    if (event.target.classList.contains('theme-toogle')) {
        themeToggleArr.forEach((element) => element.classList.toggle('light-theme'));
    }
    event.target.classList.toggle('light-theme');
    gTheme === 'dark' ? gTheme = 'light' : gTheme = 'dark';
};
themeToggle.addEventListener('click', changeTheme);

// Local storage

var gTheme = 'dark';
var gLang = 'en';

function setLocalStorage() {
    localStorage.setItem('lang', gLang);
    localStorage.setItem('theme', gTheme);
};
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');
        changeThemeFromStorage(theme);
    };
    if (localStorage.getItem('lang')) {
        const lang = localStorage.getItem('lang');
        changeLangFromStorage(lang);
    };
};

function changeThemeFromStorage(theme) {
    if (theme === 'light') {
        themeToggleArr.forEach((element) => element.classList.add('light-theme'));
        themeToggle.classList.add('light-theme');
        gTheme = 'light';
    } else {
        themeToggleArr.forEach((element) => element.classList.remove('light-theme'));
        themeToggle.classList.remove('light-theme');
        gTheme = 'dark';
    }
};
function changeLangFromStorage(lang) {
    if (lang === 'en') {
        console.log('helo1');
        let dataI18Arr = document.querySelectorAll('[data-i18]');
        dataI18Arr.forEach((element) => {
            if (element.placeholder) {
                element.placeholder = i18Obj['en'][element.dataset.i18];
                element.textContent = '';
                element.value = ''
            }
            element.textContent = i18Obj['en'][element.dataset.i18];
        });
        enLanguage.classList.add('active');
        ruLanguage.classList.remove('active');
        gLang = 'en';
    } else {
        console.log('helo2');
        let dataI18Arr = document.querySelectorAll('[data-i18]');
        dataI18Arr.forEach((element) => {
            if (element.placeholder) {
                element.placeholder = i18Obj['ru'][element.dataset.i18];
                element.textContent = '';
                element.value = ''
            }
            element.textContent = i18Obj['ru'][element.dataset.i18];
        });
        ruLanguage.classList.add('active');
        enLanguage.classList.remove('active');
        gLang = 'ru';
    }
};
window.addEventListener('load', getLocalStorage);

// window.alert("\nПроверьте пожалуйста работу в среду. Немного не успел, в процессе.\n\n┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴");