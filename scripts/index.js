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
const cardRemoveButton = cardContainer.querySelector('.gallery__remove-button');

const photoPopup = document.querySelector('.popup_photo');
const bigImg = photoPopup.querySelector('.popup__big-image-photo');
const bigImgTitle = photoPopup.querySelector('.popup__big-image-title');

const popups = Array.from(document.querySelectorAll('.popup'));
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

fillUserFields();

initialCards.forEach( (item) => cardContainer.append( createNewCard(item.link, item.name) ) );

userEditButton.addEventListener( 'click', () => openPopup(userPopup) );
userForm.addEventListener( 'submit', saveUserForm );

cardAddButton.addEventListener( 'click', () => openPopup(cardAddPopup) );
cardAddForm.addEventListener( 'submit', saveCardForm );

let popupOpened;

const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_shown');
  popupOpened = popup;
  window.addEventListener('keydown', handleEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_shown');
  window.removeEventListener('keydown', handleEscapeKey);
  popupOpened = undefined;
}

const disableDefaultSubmit = (event) => {
  event.preventDefault();
}

function fillUserFields() {
  userNameField.value = userNameText.textContent;
  userStatusField.value = userStatusText.textContent;
}

function saveUserFields() {
  userNameText.textContent = userNameField.value;
  userStatusText.textContent = userStatusField.value;
}

function saveUserForm(evt) {
  disableDefaultSubmit(evt);
  saveUserFields();
  closePopup(userPopup);
}

function likeCard(card) {
  card.querySelector('.gallery__like-button').classList.toggle('gallery__like-button_active');
}

function removeCard(card) {
  card.remove();
}

function fillPhotoPopup(image, title) {
  bigImg.src = image;
  bigImg.alt = title;
  bigImgTitle.textContent = title;
}

function showPhotoPopup(image, title) {
  fillPhotoPopup(image, title);
  openPopup(photoPopup);
}

function createNewCard(image, title) {
  const templateCard = document.querySelector('#card').content;
  const currentCard = templateCard.querySelector('.gallery__item').cloneNode(true);

  const cardImg = currentCard.querySelector('.gallery__photo');
  cardImg.src = image;

  const cardTitle = currentCard.querySelector('.gallery__title');
  cardTitle.textContent = title;
  cardImg.alt = title;

  cardImg.addEventListener( 'click', () => showPhotoPopup(image, title) );
  currentCard.querySelector('.gallery__like-button').addEventListener( 'click', () => likeCard(currentCard) );
  currentCard.querySelector('.gallery__remove-button').addEventListener( 'click', () => removeCard(currentCard) );

  return currentCard;
}

function clearCardForm() {
  cardAddForm.reset();
  // далее бы пригодилась функция toggleButtonActive, но validate.js подключается позже, поэтому "вручную"
  cardAddSubmitButon.disabled = true;
  cardAddSubmitButon.classList.add('popup__form-submit-button_error');
}

function saveCardForm(evt) {
  disableDefaultSubmit(evt);
  const cardNew = createNewCard(cardAddImageField.value, cardAddTitleField.value);
  cardContainer.prepend( cardNew );
  closePopup(cardAddPopup);
  clearCardForm();
}