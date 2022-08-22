// импортировать главный файл стилей для Webpack
import '../pages/index.css';

// импортировать все используемые классы
import Section from '../components/Section';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

// импортировать настроечные данные
import {
  initialCards,
  validationSettings,
  userEditButton,
  avatarEditButton,
  cardAddButton,
  cardContainerSelector,
  cardTemplateSelector
} from '../utils/constants.js';

let cardForDelete = null;

// создать и добавить карточку
const addCardToSection = ({name, link}) => {
  const cardObj = new Card(
    name,
    link,
    cardTemplateSelector,
    () => {
      photoPopup.open(name, link);
    },
    (card) => {
      cardForDelete = card;
      confirmDeletePopup.open({});
    },
  );
  const cardElement = cardObj.generate();
  cards.setItem(cardElement);
}

// создать инстанс пользователя
const userInfo = new UserInfo({
  'nameSelector': '.profile__name',
  'statusSelector': '.profile__status',
  'avatarSelector': '.profile__userpic'
});

// создать попап для формы подтверждения
const confirmDeletePopup = new PopupWithForm('.popup_confirmdelete', fieldValues => {
  if (cardForDelete) {
    cardForDelete.remove();
  }
  cardForDelete = null;
  confirmDeletePopup.close();
});

// создать попап для фоток
const photoPopup = new PopupWithImage('.popup_photo');

// создать попап для формы редактирования профиля
const userEditPopup = new PopupWithForm('.popup_userinfo', fieldValues => {
  userInfo.setUserInfo({
    name: fieldValues['userinfo-name'],
    status: fieldValues['userinfo-status'],
    avatar: userInfo.getUserInfo().avatar
  });
  userEditPopup.close();
});

// создать попап для формы редактирования профиля
const avatarEditPopup = new PopupWithForm('.popup_useravatar', fieldValues => {
  userInfo.setUserInfo({
    name: userInfo.getUserInfo().name,
    status: userInfo.getUserInfo().status,
    avatar: fieldValues['useravatar-avatar']
  });
  avatarEditPopup.close();
});

// создать попап для формы добавления карточки
const cardAddPopup = new PopupWithForm('.popup_addcard', fieldValues => {
  addCardToSection({
    name: fieldValues['addcard-card-title'],
    link: fieldValues['addcard-card-image']
  });
  cardAddPopup.close();
});




// создать секцию для карточек
const cards = new Section({
  data: initialCards.reverse(), // рзвернуть первоначальный массив
  renderer: addCardToSection // ведь эта функция добавляет карточку в начало
}, cardContainerSelector);

// создать инстансы валидации
const userFormValidator = new FormValidator(
  validationSettings,
  document.querySelector('.popup__form_data_addcard')
);
const cardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector('.popup__form_data_userinfo')
);
const avatarFormValidator = new FormValidator(
  validationSettings,
  document.querySelector('.popup__form_data_useravatar')
);

// отрендерить все карточки на страницу
cards.renderItems();

// запустить валидацию
userFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

// НАВЕСИТЬ ОБРАБОТЧИКИ

// на попапы
photoPopup.setEventListeners();
confirmDeletePopup.setEventListeners();
cardAddPopup.setEventListeners();
userEditPopup.setEventListeners();
avatarEditPopup.setEventListeners();


// на кнопку добавления карточки
cardAddButton.addEventListener( 'click', () => {
  cardAddPopup.open({});
});

// на кнопку редактирования пользователя
userEditButton.addEventListener( 'click', () => {
  const data = userInfo.getUserInfo();
  userEditPopup.open({
    'userinfo-name': data.name,
    'userinfo-status': data.status
  });
});


// на кнопку редактирования аватара
avatarEditButton.addEventListener( 'click', () => {
  const data = userInfo.getUserInfo();
  avatarEditPopup.open({
    'useravatar-avatar': data.avatar,
  });
});