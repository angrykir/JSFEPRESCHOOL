// Self-review

console.log('Ваша отметка - 76 балла(ов)\nОтзыв по пунктам ТЗ:\nЧастично выполненные пункты:\n1) секция hero — 3 балл(а)\n2) секция video — 3 балл(а)\n3) секция contacts — 3 балл(а)');

// Close slide menu

const slideLink = document.querySelectorAll('.slide-link');
slideLink.forEach((el) => el.addEventListener('click', closeMenu));
function closeMenu(event) {
    if (event.target.classList.contains('slide-link')) {
        document.getElementById("slide-menu-checkbox").checked = false;
    }
  };