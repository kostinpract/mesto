// импорт главного файла стилей для Webpack
import '../pages/index.css';

import Section from '../components/Section';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

import {
  initialCards,
  settings,
  userEditButton,
  cardAddButton,
  cardContainerSelector,
  cardTemplateSelector
} from '../utils/constants.js';

const addCardToSection = ({name, link}) => {
  const cardObj = new Card(name, link, cardTemplateSelector, () => {
    photoPopup.open(name, link);
    photoPopup.setEventListeners();
  });
  const cardElement = cardObj.generate();
  cards.setItem(cardElement);
}

const photoPopup = new PopupWithImage('.popup_photo');

const userInfo = new UserInfo({
  'nameSelector': '.profile__name',
  'statusSelector': '.profile__status'
});

const userEditPopup = new PopupWithForm('.popup_userinfo', fieldValues => {
  userInfo.setUserInfo({
    name: fieldValues['userinfo-name'],
    status: fieldValues['userinfo-status']
  });
  userEditPopup.close();
});

const cardAddPopup = new PopupWithForm('.popup_addcard', fieldValues => {
  addCardToSection({
    name: fieldValues['addcard-card-title'],
    link: fieldValues['addcard-card-image']
  });
  cardAddPopup.close();
});

const cards = new Section({
  data: initialCards.reverse(),
  renderer: addCardToSection
}, cardContainerSelector);

cards.renderItems();

// повесить обработчики на кнопку добавления карточки
cardAddButton.addEventListener( 'click', () => {
  cardAddPopup.open({});
  cardAddPopup.setEventListeners();
});

// повесить обработчики на кнопку добавления карточки
userEditButton.addEventListener( 'click', () => {
  const data = userInfo.getUserInfo();
  userEditPopup.open({
    'userinfo-name': data.name,
    'userinfo-status': data.status
  });
  userEditPopup.setEventListeners();
});


// ПОДКЛЮЧЕНИЕ УНИВЕРСАЛЬНОЙ ВАЛИДАЦИИ

// положить все формы в массив
const formsAll = Array.from(document.querySelectorAll(settings.formSelector));

// пройтись по массиву и создать объекты валидации для каждой формы, а также запустить валидацию
formsAll.forEach( formElement => {
  const form = new FormValidator(settings, formElement);
  form.enableValidation();
});
