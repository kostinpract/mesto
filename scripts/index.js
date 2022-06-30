const userEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('.popup_userinfo');
const userPopupCloseButton = document.querySelector('.popup__close-button_data_userinfo');
const userNameText = document.querySelector('.profile__name');
const userStatusText = document.querySelector('.profile__status');

const userForm = document.querySelector('.popup__form_data_userinfo');
const userNameField = document.querySelector('.popup__form-field_data_name');
const userStatusField = document.querySelector('.popup__form-field_data_status');
const userSaveButton = document.querySelector('.popup__form-submit-button_data_userinfo');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_addcard');
const cardAddPopupCloseButton = document.querySelector('.popup__close-button_data_addcard');

const cardAddForm = document.querySelector('.popup__form_data_addcard');
const cardAddTitleField = document.querySelector('.popup__form-field_data_card-title');
const cardAddImageField = document.querySelector('.popup__form-field_data_card-image');
const cardAddSaveButton = document.querySelector('.popup__form-submit-button_data_addcard');

const cardRemoveButton = document.querySelector('.gallery__remove-button');

const photoPopup = document.querySelector('.popup_photo');
const photoPopupCloseButton = document.querySelector('.popup__close-button_data_big-image');

const cardContainer = document.querySelector('.gallery');

initialCards.forEach( (item) => cardContainer.append( createNewCard(item.link, item.name) ) );

userEditButton.addEventListener( 'click', (evt) => {
  fillUserFields();
  openPopup(userPopup);
});
userPopupCloseButton.addEventListener( 'click', (evt) => closePopup(userPopup) );
userSaveButton.addEventListener( 'click', saveUserForm );
userForm.addEventListener( 'submit', disableDefaultSubmit );

cardAddButton.addEventListener( 'click', (evt) => openPopup(cardAddPopup) );
cardAddPopupCloseButton.addEventListener( 'click', (evt) => closePopup(cardAddPopup) );
cardAddSaveButton.addEventListener( 'click', saveCardForm );
cardAddForm.addEventListener( 'submit', disableDefaultSubmit );

photoPopupCloseButton.addEventListener( 'click', (evt) => closePopup(photoPopup) );

function openPopup(popup) {
  popup.classList.add('popup_shown');
}

function closePopup(popup) {
  popup.classList.remove('popup_shown');
}

function disableDefaultSubmit(event) {
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

function saveUserForm() {
  if (userNameField.value && userStatusField.value) {
    saveUserFields();
    closePopup(userPopup);
  }
}

function removeCard(evt) {
  const wholeCard = evt.target.closest('li');
  wholeCard.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('gallery__like-button_active');
}

function fillPhotoPopup(evt) {
  const bigImg = photoPopup.querySelector('.popup__big-image-photo');
  const bigImgTitle = photoPopup.querySelector('.popup__big-image-title');

  const thisImg = evt.target;
  const thisImgTitle = evt.target.closest('li').querySelector('.gallery__title');

  bigImg.src = thisImg.src;
  bigImg.alt = thisImg.alt;
  bigImgTitle.textContent = thisImgTitle.textContent;
}

function showPhotoPopup(evt) {
  fillPhotoPopup(evt);
  openPopup(photoPopup);
}

function createNewCard(image, title) {
  const templateCard = document.querySelector('#card').content;
  const currentCard = templateCard.cloneNode(true);

  const cardImg = currentCard.querySelector('.gallery__photo');
  cardImg.src = image;

  const cardTitle = currentCard.querySelector('.gallery__title');
  cardTitle.textContent = title;
  cardImg.alt = title;

  cardImg.addEventListener( 'click', (evt) => showPhotoPopup(evt) );
  currentCard.querySelector('.gallery__like-button').addEventListener( 'click', (evt) => likeCard(evt) );
  currentCard.querySelector('.gallery__remove-button').addEventListener( 'click', (evt) => removeCard(evt) );

  return currentCard;
}

function clearCardForm() {
  cardAddTitleField.value = '';
  cardAddImageField.value = '';
}

function saveCardForm() {
  if (cardAddTitleField.value && (cardAddImageField.value.startsWith('http://') || cardAddImageField.value.startsWith('https://'))) {
    cardContainer.prepend( createNewCard(cardAddImageField.value, cardAddTitleField.value) );
    closePopup(cardAddPopup);
    clearCardForm();
  }
}