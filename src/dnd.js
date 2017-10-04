/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
	var div = document.createElement('div');
	div.className = "draggable-div";
	div.style.width = Math.random()*100 + "%";
	div.style.height = Math.random()*100 + "%";
	div.style.top = Math.random()*100 + "%";
	div.style.left = Math.random()*100 + "%";
	div.style.position = "absolute";
	div.style.background = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
	return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */

 var elemTop;
 var elemLeft;

function addListeners(target) {
    target.addEventListener('mousedown', mouseDown, false);
    target.addEventListener('mouseup', mouseUp, false);

    function mouseDown(e){
        window.addEventListener('mousemove', mouseMove, true);
        elemTop = e.clientY - target.getBoundingClientRect().top;
        elemLeft = e.clientX - target.getBoundingClientRect().left;
    }

    function mouseUp(e)
    {
        window.removeEventListener('mousemove', mouseMove, true);
    }

    function mouseMove(e){
        e.preventDefault();

        target.style.top = e.clientY - elemTop + 'px';
        target.style.left = e.clientX - elemLeft + 'px';
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
