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
  profileElementsSettings,
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

// создать карточку
const createCard = ({ id, name, link, likes, isMyLike, ownerId }) => {
  const cardObj = new Card(
    { id, name, link, likes, isMyLike, ownerId },
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
  return cardObj;
}

// создать карточку по данным из АПИ
const createCardFromApiData = (cardFromApi) => {
  const isMyLike = cardFromApi.likes.some(element => element._id === Card.myId);
  const cardObj = createCard({
    id: cardFromApi._id,
    name: cardFromApi.name,
    link: cardFromApi.link,
    likes: cardFromApi.likes,
    isMyLike: isMyLike,
    ownerId: cardFromApi.owner._id
  });
  return cardObj;
}

// отрендерить карточку в секцию по данным карточки из АПИ
const addCardToSection = (cardFromApi) => {
  const cardObj = createCardFromApiData(cardFromApi);
  const cardElement = cardObj.generate();
  cards.setItem(cardElement);
}

// создать инстанс пользователя
const userInfo = new UserInfo(profileElementsSettings);

// создать попап для формы подтверждения удаления
const confirmDeletePopup = new PopupWithForm('.popup_confirmdelete', fieldValues => {
  const cardForDeleteId = fieldValues['confirmdelete-deleted'];
  api.removeCard(cardForDeleteId)
    .then((result) => {
      if (cardForDelete) {
        cardForDelete.remove();
      }
      cardForDelete = null;
      confirmDeletePopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
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
      userEditPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      userEditPopup.loading(false);
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
      avatarEditPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      avatarEditPopup.loading(false);
    });
});

// создать попап для формы добавления карточки
const cardAddPopup = new PopupWithForm('.popup_addcard', fieldValues => {
  const name = fieldValues['addcard-card-title'];
  const link = fieldValues['addcard-card-image'];
  cardAddPopup.loading(true);
  api.addNewCard(name, link)
    .then((result) => {
      addCardToSection(result);
      cardAddPopup.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      cardAddPopup.loading(false);
    });
});

// получить промис с данными юзера
const getUser = api.getUserInfo();

// получить промис с карточками
const getCards = api.getInitialCards();

// создать пустой массив для карточек с сервера
const allCards = [];

// создать секцию для карточек
const cards = new Section({
  data: allCards, // пока с пустым массивом
  renderer: addCardToSection
}, cardContainerSelector);

// отрендерить все карточки на страницу
Promise.all([getUser, getCards])
  .then((result) => {
    const user = result[0];
    userInfo.setUserInfo({
      name: user.name,
      status: user.about,
      avatar: user.avatar
    });
    Card.myId = user._id;
    const cardsFromApi = result[1];
    // пройтись по массиву в обратном порядке, чтобы свежие карточки выводились в начале
    for (let i = cardsFromApi.length - 1; i >= 0; i--) {
      const item = cardsFromApi[i];
      allCards.push(item);
    }
    cards.renderItems()
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
    // FIX: не показывать в форме ссылку на текущий аватар
    // 'useravatar-avatar': data.avatar,
  });
});