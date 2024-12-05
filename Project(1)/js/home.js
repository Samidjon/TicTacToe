var counter = 0;

var cells = document.querySelectorAll('#field td');
var header = document.getElementById('header');


function isVictory() {
    var combos = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6], 
    ];
    for (var combo of combos) {
        if (
            cells[combo[0]].innerHTML == cells[combo[1]].innerHTML &&
            cells[combo[1]].innerHTML == cells[combo[2]].innerHTML &&
            cells[combo[0]].innerHTML != ''
        ) {
            return true; 
        }
    }
    return false;
}

function tap(event) {
    if (counter % 2 == 0) {
        event.target.innerHTML = '<img src="./img/close.png" width=100>';
    } else {
        event.target.innerHTML = '<img src="./img/circle.png" width=100>';
    }

    if (isVictory()) {
        for (let cell of cells) {
            cell.removeEventListener("click", tap);
        }
        if (counter % 2 == 0) {
            header.innerText = 'Player 1 wins!'; 
        } else {
            header.innerText = 'Player 2 wins!'; 
        }
    }

    else if (counter == 8) {
        header.innerText = 'Draw!'; // Выводим сообщение о ничьей.
        // Отключаем обработчики клика на всех ячейках.
        for (let cell of cells) {
            cell.removeEventListener("click", tap);
        }
    }

    counter++; // Увеличиваем счетчик ходов.

    // Убираем обработчик клика с текущей ячейки, чтобы нельзя было повторно кликнуть.
    event.target.removeEventListener("click", tap);
}

// Функция для начала новой игры.
function startGame() {
    // Сбрасываем текст заголовка.
    header.innerText = 'Tic Tac Toe';

    // Обнуляем счетчик ходов.
    counter = 0;

    // Очищаем все ячейки и добавляем к ним обработчики кликов.
    for (var cell of cells) [
        cell.innerHTML = '', // Очищаем содержимое ячейки.
        cell.addEventListener('click', tap), // Добавляем обработчик клика.
    ]
}

// Запуск игры при загрузке страницы.
startGame();
