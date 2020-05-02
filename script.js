console.clear(); // чистим консоль

checkingForNewMessages = () => { // запускает наблюдения за появлением новых отрисованных сообщений
	new Promise(() => {
		setInterval(() => { // проверка через определенный интервал
			let elements = document.getElementsByClassName("im-mess--text"); // получаем все отрисованные сообщения

			// if (elements.length > oldMesCount) { // появились ли новые сообщения
				// oldMesCount = elements.length; // меняем колво отрисованных сообщений на текущее
				decodeMessages(elements); // отправляем все сообщения на проверку и послед. декодирование
			// }
		}, 1000);
	});
}

const decodeMessages = (elements) => { // проверяем и декодируем подходящие сообщения
	for (let i = 0; i < elements.length; i++) { // перебираем сообщения
		let text = elements[i].innerHTML; // получаем доступ к текст сообщения

		if (text.substring(0, 5) === pointer) { // проверяем начинается ли сообщение с нашего указателя
			elements[i].innerHTML = decodeText(text.substring(pointer.length)); // обрезание сообщения с длины указателя и запуск декодирования с присвоение декод. сообщения
		}
	}
}

const getOriginalInput = () => document.getElementsByClassName("_im_text")[0]; // возвращаем поле ввода текста сообщения ВК

const removeClassFromOriginalInput = () => originalInput.classList.remove("_im_text"); // удаляем класс оригинального поля ввода ВК

const createHiddenInput = () => { // создаем скрытое поле , из которого будут отправляться закодированные сообщения
	let newInput = document.createElement("div"); // создаем элемент div

	newInput.classList.add("_im_text"); // добавляем класс от оригинального поля ввода сообщений
	newInput.style.display = "none"; // делаем элемент не отображаемым 
	document.getElementsByClassName("_im_text_wrap")[0].appendChild(newInput); // вставляем скрытое поле ввода рядом с оригиналом

	return newInput; // возвращаем созданное поле
}

const insertTextToHiddenInput = (text) => hiddenInput.innerHTML = pointer + encodeText(text); // вставляем текст в скрытое поле ввода

// const clickOnOtherDialog = () => oldMesCount = 0; // при клике на другой диалог, обнуляется список отрисованных сообщений

const observerСallback = () => { // вызывается при изменениях в оригинальном поле ввода 
	if (originalInput.innerHTML.toString().length != 0) {
		insertTextToHiddenInput(originalInput.innerHTML.toString().trim()); // отправлем текст кодироваться и вставляться в скрытое поле ввода
	} else {
		hiddenInput.innerHTML = "";
	}
};

// const addClickHandlers = () => { // запускаем обработчики кликов по другим диалогам
// 	const allDialogs = document.getElementsByClassName("nim-dialog"); // получаем все диалоги по классу

// 	for (let i = 0; i < allDialogs.length; i++) // перебираем список диалогов
// 		allDialogs[i].addEventListener('click', clickOnOtherDialog); // вешаем слушатель кликов
// }

const encodeText = (text) => { // функия кодирования сообщения по шифру цезаря
	let result = ''; // поле для результата кодирования

	for (let i = 0; i < text.length; i++) { // перебираем все символы сообщения
		result += String.fromCharCode(text[i].charCodeAt(0) + key); // сдвигаем код символа на указанное значение 
	}

	return result; // возвращаем результат
}

const decodeText = (text) => { // функция декодирования сообщения по шифру цезаря
	let result = ''; // поле для результата декодирования

	for (let i = 0; i < text.length; i++) { // перебираем все символы сообщения
		result += String.fromCharCode(text[i].charCodeAt(0) - key); // сдвигаем код символа на указанное значение 
	}

	return result; // возвращаем результат
}

const pointer = "[SV]:"; // указатель на закодированное сообщение
const key = 1000; // ключ сдвига кодирования и декодирования
const observerConfig = { childList: true, subtree: true, characterData: true }; // настройки наблюдателя

// let oldMesCount = 0; // кол во отрисованных сообщений на странице 

let hiddenInput = createHiddenInput(); // скрытое поле ввода сообщения вк
let originalInput = getOriginalInput(); // оригинальное поле ввода сообщения вк

removeClassFromOriginalInput(); // удаляем класс оригинального поля ввода 

const observer = new MutationObserver(observerСallback); // создаем нового наблюдателя

observer.observe(originalInput, observerConfig); // запуск наблюдения

// addClickHandlers(); // добавляем обработчики кликов

checkingForNewMessages(); // запуск слежения появления новых сообщений
