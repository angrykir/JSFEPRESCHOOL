let move = 0;
const field = document.querySelector('.field');
const goesField = document.querySelector('.goes-field');

let winner = '';
const overlay = document.querySelector('.overlay');
const content = document.querySelector('.content');
const btnNext = document.querySelector('.btn-next');

field.addEventListener('click', e => {
    if (e.target.className === 'cell' && e.target.className !== 'checked') {
        e.target.classList.add('checked');
        move % 2 === 0 ? e.target.textContent = 'X' : e.target.textContent = '0';
        move % 2 === 1 ? goesField.textContent = `Ход ${move + 1} / Очередь X` : goesField.textContent = `Ход ${move + 2} / Очередь 0`;
        move++;
        check()
    }
})

field.addEventListener('mouseover', e => {
    if (e.target.className === 'cell' && e.target.className !== 'checked') {
        move % 2 === 0 ? e.target.textContent = 'X' : e.target.textContent = '0';
    }
})

field.addEventListener('mouseout', e => {
    if (e.target.className === 'cell' && e.target.className !== 'checked') {
        e.target.textContent = '';
    }
})


const cells = document.querySelectorAll('.cell');
const check = () => {
    const winArr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < winArr.length; i++) {
        if (cells[winArr[i][0]].textContent === 'X' && cells[winArr[i][1]].textContent === 'X' && cells[winArr[i][2]].textContent === 'X') {
            winner = 'победили X';
            cells[winArr[i][0]].classList.add('line-through');
            cells[winArr[i][1]].classList.add('line-through');
            cells[winArr[i][2]].classList.add('line-through');
            outputWinner();
            move = 0;
            break;
        } else if (cells[winArr[i][0]].textContent === '0' && cells[winArr[i][2]].textContent === '0' && cells[winArr[i][1]].textContent === '0') {
            winner = 'победили 0';
            cells[winArr[i][0]].classList.add('line-through');
            cells[winArr[i][1]].classList.add('line-through');
            cells[winArr[i][2]].classList.add('line-through');
            outputWinner();
            move = 0;
            break;
        } else if (move === 9) {
            winner = 'победила ничья';
            outputWinner();
            move = 0;
            break;
        }
    }
}

let wonNumber = 0;
let wonArr = ['', '', '', '', '', '', '', '', '', '']
const wonList = document.querySelectorAll('.won');
let tableNumber = 0;
const outputWinner = () => {
    goesField.textContent = `На ${move} ходу ${winner}!`;
    wonArr.unshift(`На ${move} ходу ${winner}!`);
    wonArr.splice(-1, 1);
    console.log(wonArr);
    for (let i = 0; i < wonList.length; i++) {
        wonList[i].textContent = `${wonArr[i]}`;
    }
    overlay.style.display = 'flex';
}

const closeWinnerWrapper = () => {
    cells.forEach(element => {
        element.textContent = '';
        element.classList.remove('checked');
        element.classList.remove('line-through');
    });
    overlay.style.display = 'none';
    goesField.textContent = 'Ход 1 / Очередь X'
}

overlay.addEventListener('click', closeWinnerWrapper);
btnNext.addEventListener('click', closeWinnerWrapper);

function setLocalStorage() {
    localStorage.setItem('history', JSON.stringify(wonArr));
};
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('history')) {
        wonArr = JSON.parse(localStorage.getItem('history'));
        for (let i = 0; i < wonList.length; i++) {
            wonList[i].textContent = `${wonArr[i]}`;
        }
    };
};

function fillHistory(history) {
    for (let i = 0; i < wonList.length; i++) {
        wonList[i].textContent = `${history[i]}`;
    }
};

window.addEventListener('load', getLocalStorage);