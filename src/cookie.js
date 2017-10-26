/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

listTable.addEventListener('click', function (e) {
  if (e.target.classList.contains('deleteButton')) {
    var i = e.target.parentNode.parentNode.rowIndex;
    var cookieDelete = e.target.parentNode.parentNode.firstChild.innerHTML;

    deleteCookie(cookieDelete);
    listTable.parentNode.deleteRow(i);
  }
})

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function filterCookies(value) {
	var tableArrNodes = listTable.children;
	for (var i = 0; i < tableArrNodes.length; i++) {
		console.log(1)
		if (!(tableArrNodes[i].children[0].innerText.indexOf(value) + 1) || !(tableArrNodes[i].children[1].innerText.indexOf(value) + 1)) {
			tableArrNodes[i].remove();
			console.log(tableArrNodes[i])
		}
	}
}


filterNameInput.addEventListener('keyup', function(e) {
	var filterVal = e.target.value;
	console.log(filterVal);
	filterCookies(filterVal);
});

addButton.addEventListener('click', () => {
	if (addNameInput.value != '' && addValueInput.value != '') {
		if (!getCookie(addNameInput.value)) {
			setCookie(addNameInput.value, addValueInput.value, {expires: 60});

			var newTr = document.createElement('tr');
  			newTr.innerHTML = '<td>'+addNameInput.value+'</td><td>'+addValueInput.value+'</td><td><button type="button" class="deleteButton">delete</button></td>';
			listTable.appendChild(newTr);
		} else {
			var nodes = listTable.children;
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].children[0].innerText == addNameInput.value) {
					nodes[i].children[1].innerHTML = addValueInput.value;
				}
			}
		}
	}

	
});