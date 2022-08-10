

// переменная для хранения элемента открытого попапа
let popupOpened;

// открыть попап и навесить обработчик на Escape
export function openPopup(popup) {
  popup.classList.add('popup_shown');
  popupOpened = popup;
  window.addEventListener('keydown', handleEscapeKey);
}

// закрыть попап и убрать обработчик с Escape
export function closePopup(popup) {
  popup.classList.remove('popup_shown');
  window.removeEventListener('keydown', handleEscapeKey);
  popupOpened = undefined;
}

// отслеживать нажатие Escape и закрывать открытый попап
function handleEscapeKey (evt) {
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

// заполнить фото-попап фоткой и подписью
function fillPhotoPopup(image, title) {
  bigImg.src = image;
  bigImg.alt = title;
  bigImgTitle.textContent = title;
}

// заполнить и показать фото-попап
export function showPhotoPopup(image, title) {
  fillPhotoPopup(image, title);
  openPopup(photoPopup);
}

// положить все попапы в массив
const popups = Array.from(document.querySelectorAll('.popup'));

// пройтись по попапам и навесить закрытие по клику на оверлей и кнопку
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_shown')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});