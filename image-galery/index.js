console.log('Ваша отметка - 0');

const searchButton = document.querySelector('.search-button');
const container = document.querySelector('.container');

const url = 'https://api.unsplash.com/photos/random?client_id=93CP8sFIk9se3z_DBsnPNsJAcj-1xeOPPtf2yzbAJSM';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    showData(data)
}

const img = `<img class="gallery-img" src="полученный от API адрес изображения" alt="image">`;
container.insertAdjacentHTML('beforeend', img);

searchButton.addEventListener("click", getData);

window.alert("\nПривет! Проверьте пожалуйста работу в четверг. Не успел, в процессе...\n\n┬┴┬┴┤( ͡° ͜ʖ├┬┴┬┴");