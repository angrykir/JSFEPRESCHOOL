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

const portfolioBtn = document.querySelector('.portfolio-btn');
const portfolioBtns = document.querySelector('.portfolio-btns');
const portfolioBtnArr = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-image');

function changeImage(event) {
    const season = event.target.dataset.season;
    console.log(season);
    if (event.target.classList.contains('portfolio-btn')) {
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${season}/${index + 1}.jpg`);
    }
};
portfolioBtns.addEventListener('click', changeImage);

// Add class active

function changeClassActive(event) {
    if (event.target.classList.contains('portfolio-btn')) {
        for (let i = 0; i < portfolioBtnArr.length; i++) {
            portfolioBtnArr[i].classList.remove('active');
        }
    }
    event.target.classList.add('active');
};
portfolioBtns.addEventListener('click', changeClassActive);



