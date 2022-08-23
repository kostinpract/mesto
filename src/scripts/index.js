// импортировать главный файл стилей для Webpack
import '../pages/index.css';

// импортировать все используемые классы
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';

// импортировать настроечные данные
import {
  // initialCards,
  validationSettings,
  userEditButton,
  avatarEditButton,
  cardAddButton,
  cardContainerSelector,
  cardTemplateSelector
} from '../utils/constants.js';

// элемент-карточка, который будем удалять кнопкой в окошке подтверждения
let cardForDelete = null;

// создать инстанс АПИ
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '6814e49a-71aa-4b1e-bb0d-9a0f587cf220',
    'Content-Type': 'application/json'
  }
});

// создать и добавить карточку
const addCardToSection = ({ id, name, link, likes, isMyLike, isMyCard }) => {
  const cardObj = new Card(
    { id, name, link, likes, isMyLike, isMyCard },
    cardTemplateSelector,
    () => {
      photoPopup.open(name, link);
    },
    () => {
      if (cardObj._isMyLike) {
        api.dislikeCard(cardObj._id)
          .then((result) => {
            console.log(cardObj._id + ' disliked');
            cardObj._isMyLike = false;
            cardObj._elementLike.classList.remove('gallery__like-button_active');
            cardObj._elementCount.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      } else {
        api.likeCard(cardObj._id)
          .then((result) => {
            console.log(cardObj._id + ' liked');
            cardObj._isMyLike = true;
            cardObj._elementLike.classList.add('gallery__like-button_active');
            cardObj._elementCount.textContent = result.likes.length;
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          });
      }
    },
    (card) => {
      cardForDelete = card;
      confirmDeletePopup.open({
        'confirmdelete-deleted': cardObj._id
      });
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

// создать попап для формы подтверждения удаления
const confirmDeletePopup = new PopupWithForm('.popup_confirmdelete', fieldValues => {
  const cardForDeleteId = fieldValues['confirmdelete-deleted'];
  api.removeCard(cardForDeleteId)
    .then((result) => {
      if (cardForDelete) {
        cardForDelete.remove();
      }
      cardForDelete = null;
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      confirmDeletePopup.close();
    });
});

// создать попап для увеличенных фоток
const photoPopup = new PopupWithImage('.popup_photo');

// создать попап для формы редактирования профиля
const userEditPopup = new PopupWithForm('.popup_userinfo', fieldValues => {
  const name = fieldValues['userinfo-name'];
  const status = fieldValues['userinfo-status'];
  const avatar = userInfo.getUserInfo().avatar;
  userEditPopup.loading(true);
  api.setUserInfo(name, status)
    .then((result) => {
      userInfo.setUserInfo({
        name: name,
        status: status,
        avatar: avatar
      });
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      userEditPopup.loading(false);
      userEditPopup.close();
    });
});

// создать попап для формы редактирования аватара
const avatarEditPopup = new PopupWithForm('.popup_useravatar', fieldValues => {
  const name = userInfo.getUserInfo().name;
  const status = userInfo.getUserInfo().status;
  const avatar = fieldValues['useravatar-avatar'];
  avatarEditPopup.loading(true);
  api.setUserAvatar(avatar)
    .then((result) => {
      userInfo.setUserInfo({
        name: name,
        status: status,
        avatar: avatar
      });
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      avatarEditPopup.loading(false);
      avatarEditPopup.close();
    });
});

// создать попап для формы добавления карточки
const cardAddPopup = new PopupWithForm('.popup_addcard', fieldValues => {
  const name = fieldValues['addcard-card-title'];
  const link = fieldValues['addcard-card-image'];
  cardAddPopup.loading(true);
  api.addNewCard(name, link)
    .then((result) => {
      addCardToSection({
        id: result._id,
        name: name,
        link: link,
        likes: result.likes,
        isMyLike: false,
        isMyCard: true,
      });
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      cardAddPopup.loading(false);
      cardAddPopup.close();
    });
});


// создать секцию для карточек
const cards = new Section({
  data: [], // исходный массив нам теперь не нужен, но секцию проинициализировать надо
  renderer: addCardToSection // ведь эта функция добавляет карточку в начало
}, cardContainerSelector);

// отрендерить все карточки на страницу
cards.renderItems();

// айди моего пользователя
let myId = '';

api.getUserInfo()
  .then((result) => {
    userInfo.setUserInfo({
      name: result.name,
      status: result.about,
      avatar: result.avatar
    });
    myId = result._id;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

api.getInitialCards()
  .then((result) => {
    // пройтись по массиву в обратном порядке, чтобы свежие карточки выводились в начале
    for (let i = result.length - 1; i >= 0; i--) {
      const item = result[i];
      const isMyCard = item.owner._id === myId;
      const isMyLike = item.likes.some(element => element._id === myId);
      addCardToSection({
        id: item._id,
        name: item.name,
        link: item.link,
        likes: item.likes,
        isMyLike: isMyLike,
        isMyCard: isMyCard
      });
    }
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


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
cardAddButton.addEventListener('click', () => {
  cardAddPopup.open({});
});

// на кнопку редактирования пользователя
userEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  userEditPopup.open({
    'userinfo-name': data.name,
    'userinfo-status': data.status
  });
});


// на кнопку редактирования аватара
avatarEditButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo();
  avatarEditPopup.open({
    'useravatar-avatar': data.avatar,
  });
});