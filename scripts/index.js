const userEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('.popup_userinfo');
const userPopupCloseButton = document.querySelector('.popup__close-button_data_userinfo');
const userNameText = document.querySelector('.profile__name');
const userStatusText = document.querySelector('.profile__status');

const userForm = document.querySelector('.popup__form_data_userinfo');
const userNameField = document.querySelector('.popup__form-field_data_name');
const userStatusField = document.querySelector('.popup__form-field_data_status');
const userSaveButton = document.querySelector('.popup__form-submit-button_data_userinfo');

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_addcard');
const addCardPopupCloseButton = document.querySelector('.popup__close-button_data_addcard');

const addCardForm = document.querySelector('.popup__form_data_addcard');
const addCardTitleField = document.querySelector('.popup__form-field_data_card-title');
const addCardImageField = document.querySelector('.popup__form-field_data_card-image');
const addCardSaveButton = document.querySelector('.popup__form-submit-button_data_addcard');

const cardRemoveButton = document.querySelector('.gallery__remove-button');

const photoPopup = document.querySelector('.popup_photo');
const photoPopupCloseButton = document.querySelector('.popup__close-button_data_big-image');

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

userEditButton.addEventListener( 'click', (evt) => openPopup(userPopup) );
userPopupCloseButton.addEventListener( 'click', (evt) => closePopup(userPopup) );
userSaveButton.addEventListener( 'click', userSaveForm );
userForm.addEventListener( 'submit', disableDefaultSubmit );

addCardButton.addEventListener( 'click', (evt) => openPopup(addCardPopup) );
addCardPopupCloseButton.addEventListener( 'click', (evt) => closePopup(addCardPopup) );
addCardSaveButton.addEventListener( 'click', addCardSaveForm );
addCardForm.addEventListener( 'submit', disableDefaultSubmit );

photoPopupCloseButton.addEventListener( 'click', (evt) => closePopup(photoPopup) );

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

function fillPhotoPopup(evt) {
  bigImg = photoPopup.querySelector('.popup__big-image-photo');
  thisImg = evt.target;
  bigImg.src = thisImg.src;
  bigImg.alt = thisImg.alt;
  thisImgTitle = evt.target.closest('li').querySelector('.gallery__title');
  bigImgTitle = photoPopup.querySelector('.popup__big-image-title');
  bigImgTitle.textContent = thisImgTitle.textContent;
  openPopup(photoPopup);
};

function removeCard(evt) {
  const wholeCard = evt.target.closest('li');
  wholeCard.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('gallery__like-button_active');
}

function createNewCard(image, title) {
  const templateCard = document.querySelector('#card').content;
  const currentCard = templateCard.cloneNode(true);
  const cardImg = currentCard.querySelector('.gallery__photo');
  cardImg .addEventListener('click', function(evt) {
    bigImg = photoPopup.querySelector('.popup__big-image-photo');
    thisImg = evt.target;
    bigImg.src = thisImg.src;
    bigImg.alt = thisImg.alt;
    thisImgTitle = evt.target.closest('li').querySelector('.gallery__title');
    bigImgTitle = photoPopup.querySelector('.popup__big-image-title');
    bigImgTitle.textContent = thisImgTitle.textContent;
    openPopup(photoPopup);
  });
  cardImg.src = image;
  const cardTitle = currentCard.querySelector('.gallery__title');
  cardTitle.textContent = title;
  cardImg.alt = title;
  cardImg.addEventListener( 'click', (evt) => fillPhotoPopup(evt) );
  currentCard.querySelector('.gallery__like-button').addEventListener( 'click', (evt) => likeCard(evt) );
  currentCard.querySelector('.gallery__remove-button').addEventListener( 'click', (evt) => removeCard(evt) );
  return currentCard;
}

function addCardSaveForm() {
  if (addCardTitleField.value && (addCardImageField.value.startsWith('http://') || addCardImageField.value.startsWith('https://'))) {
    cardContainer.prepend( createNewCard(addCardImageField.value, addCardTitleField.value) );
    closePopup(addCardPopup);
  }
}