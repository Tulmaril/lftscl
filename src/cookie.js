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

function listCookies() {
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
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
  drawTable();
	var tableArrNodes = listTable.children;
  
	for (var i = 0; i < tableArrNodes.length; i++) {
		if ((tableArrNodes[i].children[0].innerText.indexOf(value) != -1) || (tableArrNodes[i].children[1].innerText.indexOf(value) != -1)) {
			tableArrNodes[i].style.display = "table-row";
		} else {
      tableArrNodes[i].style.display = "none";
    }
	}
}

document.addEventListener("DOMContentLoaded", function() {
  drawTable();
});

filterNameInput.addEventListener('keyup', function(e) {
	var filterVal = e.target.value;
	filterCookies(filterVal);
});



addButton.addEventListener('click', () => {
	if (addNameInput.value != '' && addValueInput.value != '') {
		setCookie(addNameInput.value, addValueInput.value, {expires: 60});
    listTable.innerHTML = "";
    drawTable();
    filterCookies(filterNameInput.value);
    addNameInput.value = '';
    addValueInput.value = '';
	}
});

function drawTable() {
  listTable.innerHTML = "";
  var output = {};

  document.cookie.split(/\s*;\s*/).forEach(function(pair) {
    pair = pair.split(/\s*=\s*/);
    output[pair[0]] = pair.splice(1).join('=');
  });

  for ( var cooke in output ) {
    var newTrt = document.createElement('tr');
    newTrt.innerHTML = '<td>'+cooke+'</td><td>'+output[cooke]+'</td><td><button type="button" class="deleteButton">delete</button></td>';
    listTable.appendChild(newTrt);
  }
}
