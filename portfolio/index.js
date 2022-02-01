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
            element.textContent = ''
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
};
langBtns.addEventListener('click', changeClassActiveLang);


window.alert("\nПроверьте пожалуйста работу в среду. Немного не успел, в процессе.\n\n┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴");

