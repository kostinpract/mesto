import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './data.js';
import { openPopup, closePopup } from './popup.js';

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

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__form-submit-button',
  inactiveButtonClass: 'popup__form-submit-button_error',
  inputErrorClass: 'popup__form-field_error',
  messageErrorClass: 'popup__form-warning_active'
}

// создать карточку с помощью класса
function createCard(item) {
  const cardObj = new Card(item.name, item.link, cardTemplateSelector);
  return cardObj.generate();
}

// отменить дефолтный обработчик формы
function disableDefaultSubmit(event) {
  event.preventDefault();
}

// заполнить поля в форме профиля данными со страницы
function fillUserFields() {
  userNameField.value = userNameText.textContent;
  userStatusField.value = userStatusText.textContent;
}

// заполнить данные на странице значениями из полей формы профиля
function saveUserFields() {
  userNameText.textContent = userNameField.value;
  userStatusText.textContent = userStatusField.value;
}

// сохранить данные из формы и закрыть попап
function saveUserForm(evt) {
  disableDefaultSubmit(evt);
  saveUserFields();
  closePopup(userPopup);
}

// сбросить форму профиля и деактивировать кнопку сабмита
function clearCardForm() {
  cardAddForm.reset();
}

// отрендерить новую карточку
function addNewCard() {
  cardContainer.prepend( createCard({name: cardAddTitleField.value, link: cardAddImageField.value}) );
}

// создать карточку по данным из формы, закрыть попап формы, сбросить форму
function saveCardForm(evt) {
  disableDefaultSubmit(evt);
  addNewCard();
  closePopup(cardAddPopup);
  clearCardForm();
}

// повесить обработчики на кнопку и форму редактирования профиля
userEditButton.addEventListener( 'click', () => openPopup(userPopup) );
userForm.addEventListener( 'submit', saveUserForm );

// повесить обработчики на кнопку и форму добавления карточки
cardAddButton.addEventListener( 'click', () => openPopup(cardAddPopup) );
cardAddForm.addEventListener( 'submit', saveCardForm );

// отрендерить карточки из исходного массива данных
initialCards.forEach( (item) => {
  cardContainer.append( createCard(item) );
});

// положить все формы в массив
const formsAll = Array.from(document.querySelectorAll(settings.formSelector));

// пройтись по массиву и создать объекты валидации для каждой формы, а также запустить валидацию
formsAll.forEach( (formElement) => {
  const form = new FormValidator(settings, formElement);
  form.enableValidation();
});

// заполнить поля формы профиля данными со страницы
fillUserFields();