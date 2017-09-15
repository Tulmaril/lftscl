/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
	for (var i = 0; i < array.length; i++) {
		fn(array[i], i, array);
	}
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
	let result = [];
	for (var i = 0; i < array.length; i++) {
		result.push(fn(array[i], i, array));
	}

	return result;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
	var current = initial;

	if (!current) {
		current = array[0];
			for (var i = 1; i < array.length; i++) {
			current = fn(current, array[i], i, array);
		}
	} else {
			for (var i = 0; i < array.length; i++) {
			current = fn(current, array[i], i, array);
		}
	}
	
	return current;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
	if (obj.hasOwnProperty( prop )) {
		delete obj[prop];

		return true;
	}

		return false;
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
	if (obj.hasOwnProperty( prop )) {

		return true;
	}

	return false
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
	var arr = [];

	for (var prop in obj) {
		arr.push(prop);
	}

	return arr;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
	var arr = [];

	for (var prop in obj) {
		arr.push(prop.toUpperCase());
	}

	return arr;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
	var arr = [];

	if (to === undefined) {
		to = array.length;
	}
	if (from < 0) {
		from = array.length + from;
	}
	if (to < 0) {
		to = array.length + to;
	}

	for ( var i = from; i < to; i++) {
		arr.push(array[i]);
	}

	return arr;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
	
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
