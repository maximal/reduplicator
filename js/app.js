/**
 * Клиентская Яваскрипт-версия старого редупликатора (http://maximals.ru/tools/ohuevator/)
 *
 *
 * @since 2015-11-02 Проект переписан на Яваскрипт.
 * @date 2015-11-02
 * @author MaximAL
 * @link https://github.com/maximal/reduplicator
 * @link http://maximals.ru
 * @link http://sijeko.ru
 * @copyright © MaximAL, Sijeko 2015
 */


/* global jQuery */
jQuery(function ($) {

	// Жёсткий, мужицкий стрикт
	'use strict';


	// Все русские буквы
	var allRu = 'а-яё';
	// Все русские гласные
	var vowelsRu = 'аеёиоуэюя';
	// Все английские буквы
	//var allEn = 'a-z';
	// Все английские гласные
	//var vowelsEn = 'aeiouy';

	// Исходный текст
	var txtInp = $('input[name=text]');
	// Результат хуй-редупликации
	var divHui = $('#hui-result');
	// Результат шм-редупликации
	var divShm = $('#shm-result');


	/**
	 * Хуй-редупликация текста.
	 * @param {string} text Исходный текст
	 * @returns {string} Возвращает результат хуй-редупликации
	 */
	function huiReduplicate(text) {
		// Внутренний регвыр, чтоб не создавать каждый раз объёкт заново
		var subRegex = new RegExp('[^' + vowelsRu + ']*([' + vowelsRu + '])');

		// Для всех русских слов вызываем внутренний регвыр
		return text.replace(new RegExp('[' + allRu + ']+', 'g'), function (word) {
			return word.replace(subRegex, function ($0, $1) {
				var rep = null;
				switch ($1) {
					case 'а':
						// шапка → хуяпка
						rep = 'я';
						break;
					case 'о':
						// опера → хуёпера
						rep = 'ё';
						break;
					case 'у':
						// ушко → хуюшко
						rep = 'ю';
						break;
					case 'э':
						// эльф → хуельф
						rep = 'е';
						break;

					default:
						rep = $1;
						break;
				}
				return 'ху' + rep;
			});
		});
	}

	/**
	 * Шм-редупликация текста.
	 * @param {string} text Исходный текст
	 * @returns {string} Возвращает результат шм-редупликации
	 */
	function shmReduplicate(text) {
		// Внутренний регвыр, чтоб не создавать каждый раз объёкт заново
		var subRegex = new RegExp('[^' + vowelsRu + ']*([' + vowelsRu + '])');

		// Для всех русских слов вызываем внутренний регвыр
		return text.replace(new RegExp('[' + allRu + ']+', 'g'), function (word) {
			return word.replace(subRegex, 'шм$1');
		});
	}

	/**
	 * Отобразить результаты редупликации.
	 * @param {string} text Исходный текст
	 */
	function renderResults(text) {
		text = text.toLowerCase();
		divHui.text(huiReduplicate(text));
		divShm.text(shmReduplicate(text));
	}

	/**
	 * При загрузке проверить хеш-страницы и редуплицировать его.
	 */
	function onLoad() {
		var text = decodeURIComponent($.trim(location.hash.replace('#', '').replace(/_/g, ' ')));
		if (text === '') {
			text = 'текст';
		}
		txtInp.val(text);
		txtInp.focus().select();
		renderResults(text);
	}
	onLoad();

	// При вводе текста меняем хеш страницы и отображаем результаты
	txtInp.on('input', function () {
		var text = $.trim($(this).val());
		location.hash = text.replace(/\s+/gi, '_');
		renderResults(text);
	});
});
