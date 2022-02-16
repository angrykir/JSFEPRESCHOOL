console.log('Ваша отметка - 70 балла(ов)\nОтзыв по пункам ТЗ:\nВсе пункты выполнены полностью!');

const searchButton = document.querySelector('.search-button');
const imgGallery = document.querySelector('.img-gallery');
const searchInput = document.querySelector('.search-input');


async function getData() {
    const searchValue = document.querySelector('.search-input').value;
    const url = `https://api.unsplash.com/photos/random?client_id=93CP8sFIk9se3z_DBsnPNsJAcj-1xeOPPtf2yzbAJSM&count=3&query=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(Object.keys(data));
    document.querySelectorAll(".frame").forEach(element => element.remove());
    document.querySelectorAll(".errors").forEach(element => element.remove());
    const checkError = Object.keys(data);
    if (checkError[0] === 'errors') {
        const img = `<span class="errors">${data.errors}</span>`;
        imgGallery.insertAdjacentHTML('beforeend', img);
    } else {
        showData(data);
    }
}

// if (Object.keys(data) === ['errors']){

function showData(data) {
    data.forEach(element => {
        const img = `<div class="frame"><img src="${element.urls.small}" alt="image"><a href="${element.links.html}" target="_blank">${element.user.name}</a></div>`;
        imgGallery.insertAdjacentHTML('beforeend', img);
    });
}

searchInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        getData();
    }
});
searchButton.addEventListener("click", getData);
