const field = document.querySelector('.field');
let move = 0;
let winner = '';
const winnerWrapper = document.querySelector('.winner-wrapper');
const overlay = document.querySelector('.overlay');
const content = document.querySelector('.content');
const btnNext = document.querySelector('.btn-next');

field.addEventListener('click', e => {
    if (e.target.className = 'cell') {
        move % 2 === 0 ? e.target.innerHTML = 'X' : e.target.innerHTML = '0';
        move++;
        check()
    }
})

const check = () => {
    const cells = document.querySelectorAll('.cell');
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
        if (cells[winArr[i][0]].innerHTML === 'X' && cells[winArr[i][2]].innerHTML === 'X' && cells[winArr[i][1]].innerHTML === 'X') {
            winner = 'крестики';
            outputWinner();
            break;
        } else if (cells[winArr[i][0]].innerHTML === '0' && cells[winArr[i][2]].innerHTML === '0' && cells[winArr[i][1]].innerHTML === '0') {
            winner = 'нолики';
            outputWinner();
            break;
        } else if (move === 9) {
            winner = 'ничья';
            outputWinner();
        }
    }
}

const outputWinner = () => {
    content.innerHTML = `Пебедили ${winner}!`;
    winnerWrapper.style.display = 'block'; 
}

const closeWinnerWrapper = () => {
    winnerWrapper.style.display = 'none';
    location.reload();
}

overlay.addEventListener('click', closeWinnerWrapper);
btnNext.addEventListener('click', closeWinnerWrapper);


