@@include('jquery-3.4.1.min.js');
@@include('jquery-input-mask-phone-number.min.js');
@@include('swiper.min.js');
@@include('all.min.js');
@@include('webpcheck.js');

$(document).ready(function () {
	const btnCallback = $('.btn-callback-js');
	const btnFeedback = $('.btn-main-js');
	const popupContainerCallback = $('.popup-container-callback-js');
	const popupContainerFeedback = $('.popup-container-feedback-js');
	const popupWindowCallback = $('.popup_callback');
	const popupWindowFeedback = $('.popup_feedback');
	const btnClosePopup = $('.popup__close');
	const btnAfter = $('.btn_after-js');
	const popupForm = $('.popup__form-js');
	const popupHeader = $('.popup__header');
	const popupBody = $('.popup__body');
	const popupFooter = $('.popup__footer');
	const popupAfter = $('.popup__after');
	const burger = $('.header__burger');
	const menu = $('.header__menu');
	const menuLink = $('.header__link');
	const callbackForm = $('#callback-form');
	const feedbackForm = $('#feedback-form');
	const window = $(window);

	// отключение скролла страницы
	function disableScroll() {
		$(window).on('scroll', () => {
			let x = window.scrollX;
			let y = window.scrollY;
			window.scrollTo(x, y)
		})
	};

	// включение скролла страницы
	function enableScroll() {
		$('html, body').off('mousewheel');
	}

	//фунуция вызова окна обратной связи
	function openCallback() {
		popupContainerCallback.fadeIn(400, disableScroll);
		popupWindowCallback.addClass('popup-active');
	};

	// функция закрытия окна обратной связи при нажатии на сам контейнер
	function onContainerClosePopup(event) {
		if (event.target === this) {
			$(this).fadeOut(400, enableScroll);
			popupWindowCallback.removeClass('popup-active');
			popupWindowFeedback.removeClass('popup-active');
		}
	};

	// функция закрытия окна обратной связи при нажатии крестик или кнопку 
	function onBtnClosePopup() {
		popupContainerCallback.fadeOut(400, enableScroll);
		popupContainerFeedback.fadeOut(400, enableScroll);
		popupWindowCallback.removeClass('popup-active');
		popupWindowFeedback.removeClass('popup-active');
	};
	// появление сообщения после отправки формы
	function onSubmitForm() {
		popupHeader.hide();
		popupBody.hide();
		popupFooter.hide();
		popupAfter.fadeIn();
	}
	// закрытие модульного окна
	function onBtnAfterClick() {
		popupHeader.show(900);
		popupBody.show(900);
		popupFooter.show(900);
		popupAfter.hide(1000);
		onBtnClosePopup();
	}

	function openFeedback() {
		popupContainerFeedback.fadeIn(400, disableScroll);
		popupWindowFeedback.addClass('popup-active');
	}

	btnCallback.on('click', openCallback);
	popupContainerCallback.on('click', onContainerClosePopup);
	popupContainerFeedback.on('click', onContainerClosePopup);
	btnClosePopup.on('click', onBtnClosePopup);
	btnAfter.on('click', onBtnClosePopup);
	popupForm.on('submit', onSubmitForm);
	btnAfter.on('click', onBtnAfterClick);
	btnFeedback.on('click', openFeedback);


	// открытие и закрытие меню при нажатии на бургер
	burger.on('click', function () {
		menu.toggleClass('active');
		$(this).toggleClass('active');
	});
	// Клик по ссылке из мобильного меню
	menuLink.on('click', function () {
		if (menu.hasClass('active')) {
			menu.toggleClass('active');
			burger.toggleClass('active');
		};
	});

	//Отправка формы без перезагрузки страницы
	callbackForm.submit(function (e) { // Устанавливаем событие отправки для формы
		e.preventDefault();
		const form_data = $(this).serialize(); // Собираем все данные из формы
		$.ajax({
			type: "POST", // Метод отправки
			url: "telegram.php", // Путь до php файла отправителя
			data: form_data,
			success: function (r) {
				popupHeader.hide();
				popupBody.hide();
				popupFooter.hide();
				popupAfter.fadeIn();
			}
		});
	});

	feedbackForm.submit(function (e) { // Устанавливаем событие отправки для формы
		e.preventDefault();
		const form_data = $(this).serialize(); // Собираем все данные из формы
		$.ajax({
			type: "POST", // Метод отправки
			url: "telegram.php", // Путь до php файла отправителя
			data: form_data,
			success: function (r) {
				popupHeader.hide();
				popupBody.hide();
				popupFooter.hide();
				popupAfter.fadeIn();
			}
		});
	});

	// маска для ввода номер телефона в форму обратной связи

	$('.popup__input-phone').usPhoneFormat({
		format: '(xxx) xxx-xxxx',
	});
});



