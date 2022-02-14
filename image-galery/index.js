// window.alert("\nПривет! Проверьте пожалуйста работу в четверг. Не успел, в процессе...\n\n┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴");

console.log('Ваша отметка - 0');

const searchButton = document.querySelector('.search-button');
const container = document.querySelector('.img-gallery');
let searchInput = document.querySelector('.search-input');


async function getData() {
    let searchValue = document.querySelector('.search-input').value;
    let url = `https://api.unsplash.com/photos/random?client_id=93CP8sFIk9se3z_DBsnPNsJAcj-1xeOPPtf2yzbAJSM&count=3&query=${searchValue}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    data.forEach(element => console.log(element.urls.regular));
    showData(data);
}

function showData(data) {
    data.forEach(element => {
        const img = `<img src="${element.urls.regular}">`;
        container.insertAdjacentHTML('beforeend', img);
    });
}

searchButton.addEventListener("click", getData);
