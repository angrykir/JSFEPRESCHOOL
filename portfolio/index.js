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