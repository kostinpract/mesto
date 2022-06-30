const userEditButton = document.querySelector('.profile__edit-button');
const userPopup = document.querySelector('.popup_userinfo');
const userPopupCloseButton = userPopup.querySelector('.popup__close-button_data_userinfo');
const userNameText = document.querySelector('.profile__name');
const userStatusText = document.querySelector('.profile__status');

const userForm = document.querySelector('.popup__form_data_userinfo');
const userNameField = userForm.querySelector('.popup__form-field_data_name');
const userStatusField = userForm.querySelector('.popup__form-field_data_status');
const userSaveButton = userForm.querySelector('.popup__form-submit-button_data_userinfo');

const cardAddButton = document.querySelector('.profile__add-button');
const cardAddPopup = document.querySelector('.popup_addcard');
const cardAddPopupCloseButton = cardAddPopup.querySelector('.popup__close-button_data_addcard');

const cardAddForm = document.querySelector('.popup__form_data_addcard');
const cardAddTitleField = cardAddForm.querySelector('.popup__form-field_data_card-title');
const cardAddImageField = cardAddForm.querySelector('.popup__form-field_data_card-image');
const cardAddSaveButton = cardAddForm.querySelector('.popup__form-submit-button_data_addcard');

const cardContainer = document.querySelector('.gallery');
const cardRemoveButton = cardContainer.querySelector('.gallery__remove-button');

const photoPopup = document.querySelector('.popup_photo');
const bigImg = photoPopup.querySelector('.popup__big-image-photo');
const bigImgTitle = photoPopup.querySelector('.popup__big-image-title');
const photoPopupCloseButton = photoPopup.querySelector('.popup__close-button_data_big-image');

initialCards.forEach( (item) => cardContainer.append( createNewCard(item.link, item.name) ) );

userEditButton.addEventListener( 'click', () => {
  fillUserFields();
  openPopup(userPopup);
});
userPopupCloseButton.addEventListener( 'click', () => closePopup(userPopup) );
userSaveButton.addEventListener( 'click', saveUserForm );
userForm.addEventListener( 'submit', disableDefaultSubmit );

cardAddButton.addEventListener( 'click', () => openPopup(cardAddPopup) );
cardAddPopupCloseButton.addEventListener( 'click', () => closePopup(cardAddPopup) );
cardAddSaveButton.addEventListener( 'click', saveCardForm );
cardAddForm.addEventListener( 'submit', disableDefaultSubmit );

photoPopupCloseButton.addEventListener( 'click', () => closePopup(photoPopup) );

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

function likeCard(card) {
  card.classList.toggle('gallery__like-button_active');
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
  cardAddTitleField.value = '';
  cardAddImageField.value = '';
}

function saveCardForm() {
  if (cardAddTitleField.value && (cardAddImageField.value.startsWith('http://') || cardAddImageField.value.startsWith('https://'))) {
    const cardNew = createNewCard(cardAddImageField.value, cardAddTitleField.value);
    cardContainer.prepend( cardNew );
    closePopup(cardAddPopup);
    clearCardForm();
  }
}