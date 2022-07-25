import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './data.js';

const userEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('.popup_userinfo');
const userNameText = document.querySelector('.profile__name');
const userStatusText = document.querySelector('.profile__status');

const userForm = document.querySelector('.popup__form_data_userinfo');
const userNameField = userForm.querySelector('.popup__form-field_data_name');
const userStatusField = userForm.querySelector('.popup__form-field_data_status');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_addcard');

const cardAddForm = document.querySelector('.popup__form_data_addcard');
const cardAddImageField = cardAddForm.querySelector('.popup__form-field_data_card-image');
const cardAddTitleField = cardAddForm.querySelector('.popup__form-field_data_card-title');
const cardAddSubmitButon = document.querySelector('.popup__form-submit-button_data_addcard');

const cardContainer = document.querySelector('.gallery');
const cardTemplateSelector = '#card';

const photoPopup = document.querySelector('.popup_photo');
const bigImg = photoPopup.querySelector('.popup__big-image-photo');
const bigImgTitle = photoPopup.querySelector('.popup__big-image-title');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__form-submit-button',
  inactiveButtonClass: 'popup__form-submit-button_error',
  inputErrorClass: 'popup__form-field_error',
  messageErrorClass: 'popup__form-warning_active'
}

// все попапы кладём в массив
const popups = Array.from(document.querySelectorAll('.popup'));

// проходимся по попапам и навешиваем закрытие по клику на оверлей и кнопку
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

// заполняем поля формы профиля
fillUserFields();

// создаём и рендерим карточку с помощью класса
const createCard = (item) => {
  const cardObj = new Card(item.name, item.link, cardTemplateSelector);
  cardContainer.prepend( cardObj.generate() );
}

// разворачиваем массив, чтобы использовать универсальную функцию рендеринга с prepend
initialCards.reverse();

// создаём и рендерим карточки из исходного массива
initialCards.forEach(createCard);

// отменяем дефолтный сабмит формы
const disableDefaultSubmit = (event) => {
  event.preventDefault();
}

// вешаем обработчики на кнопку и форму редактирования профиля
userEditButton.addEventListener( 'click', () => openPopup(userPopup) );
userForm.addEventListener( 'submit', saveUserForm );

// вешаем обработчики на кнопку и форму добавления карточки
cardAddButton.addEventListener( 'click', () => openPopup(cardAddPopup) );
cardAddForm.addEventListener( 'submit', saveCardForm );

// в этой глобальной переменной будем хранить элемент открытого попапа
let popupOpened;

// отслеживаем нажатие Escape и закрываем открытый попап
const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

// открываем попап и навешиваем обработчик на Escape
function openPopup(popup) {
  popup.classList.add('popup_shown');
  popupOpened = popup;
  window.addEventListener('keydown', handleEscapeKey);
}

// закрываем попап и убираем обработчик с Escape
function closePopup(popup) {
  popup.classList.remove('popup_shown');
  window.removeEventListener('keydown', handleEscapeKey);
  popupOpened = undefined;
}

// заполняем поля в форме профиля данными со страницы
function fillUserFields() {
  userNameField.value = userNameText.textContent;
  userStatusField.value = userStatusText.textContent;
}

// заполняем данные на странице значениями из полей формы профиля
function saveUserFields() {
  userNameText.textContent = userNameField.value;
  userStatusText.textContent = userStatusField.value;
}

// сохраняем данные из формы и закрываем попап
function saveUserForm(evt) {
  disableDefaultSubmit(evt);
  saveUserFields();
  closePopup(userPopup);
}

// заполняем фото-попап фоткой и подписью
function fillPhotoPopup(image, title) {
  bigImg.src = image;
  bigImg.alt = title;
  bigImgTitle.textContent = title;
}

// открываем фото-попап
export function showPhotoPopup(image, title) {
  fillPhotoPopup(image, title);
  openPopup(photoPopup);
}

// сбрасываем форму профиля и деактивируем кнопку сабмита
function clearCardForm() {
  cardAddForm.reset();
}

// создаём и рендерим новую карточку
function addNewCard() {
  createCard({name: cardAddTitleField.value, link: cardAddImageField.value});
}

// создаём карточку по данным из формы, закрываем попап формы, сбрасываем форму
function saveCardForm(evt) {
  disableDefaultSubmit(evt);
  addNewCard();
  closePopup(cardAddPopup);
  clearCardForm();
}

// все формы кладём в массив
const formsAll = Array.from(document.querySelectorAll(settings.formSelector));

// проходимся по массиву и создаём объект валидации для каждой формы, а также запускаем валидацию
formsAll.forEach( (formElement) => {
  const form = new FormValidator(settings, formElement);
  form.enableValidation();
});