const userEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('.popup_data_userinfo');
const userPopupCloseButton = document.querySelector('.popup__close-button_data_userinfo');
const userNameText = document.querySelector('.profile__name');
const userStatusText = document.querySelector('.profile__status');

const userForm = document.querySelector('.popup__form_data_userinfo');
const userNameField = document.querySelector('.popup__form-field_data_name');
const userStatusField = document.querySelector('.popup__form-field_data_status');
const userSaveButton = document.querySelector('.popup__form-submit-button_data_userinfo');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_data_addcard');
const addCardPopupCloseButton = document.querySelector('.popup__close-button_data_addcard');

const addCardForm = document.querySelector('.popup__form_data_addcard');
const addCardTitleField = document.querySelector('.popup__form-field_data_card-title');
const addCardImageField = document.querySelector('.popup__form-field_data_card-image');
const addCardSaveButton = document.querySelector('.popup__form-submit-button_data_addcard');

const cardContainer = document.querySelector('.gallery');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach( (item) => cardContainer.append( createNewCard(item.link, item.name) ) );

userEditButton.addEventListener('click', function() { openPopup(userPopup); });
userPopupCloseButton.addEventListener('click', function() { closePopup(userPopup); });
userSaveButton.addEventListener('click', userSaveForm);
userForm.addEventListener('submit', disableDefaultSubmit);

addCardButton.addEventListener('click', function() { openPopup(addCardPopup); });
addCardPopupCloseButton.addEventListener('click', function() { closePopup(addCardPopup); });
addCardSaveButton.addEventListener('click', addCardSaveForm);
addCardForm.addEventListener('submit', disableDefaultSubmit);

function openPopup(popup) {
  popup.classList.remove('popup_closed');
  userFillFields();
}

function closePopup(popup) {
  popup.classList.add('popup_closed');
}

function disableDefaultSubmit(event) {
  event.preventDefault();
}

function userFillFields() {
  userNameField.value = userNameText.textContent;
  userStatusField.value = userStatusText.textContent;
}

function userSaveFields() {
  userNameText.textContent = userNameField.value;
  userStatusText.textContent = userStatusField.value;
}

function userSaveForm() {
  if (userNameField.value && userStatusField.value) {
    userSaveFields();
    closePopup(userPopup);
  }
}

function createNewCard(image, title) {
  const templateCard = document.querySelector('#card').content;
  const currentCard = templateCard.cloneNode(true);
  const cardImg = currentCard.querySelector('.gallery__photo');
  cardImg.src = image;
  const cardTitle = currentCard.querySelector('.gallery__title');
  cardTitle.textContent = title;
  cardImg.alt = title;
  currentCard.querySelector('.gallery__like-button').addEventListener('click', function(evt) {
    evt.target.classList.toggle('gallery__like-button_active');
  });
  return currentCard;
}

function addCardSaveForm() {
  if (addCardTitleField.value && (addCardImageField.value.startsWith('http://') || addCardImageField.value.startsWith('https://'))) {
    cardContainer.prepend( createNewCard(addCardImageField.value, addCardTitleField.value) );
    closePopup(addCardPopup);
  }
}

/*
function renderInitialCards() {
  for (let i = 0; i < initialCards.length; i++) {
    cardContainer.append(createNewCard(initialCards[i].link, initialCards[i].name));
  }
}
*/