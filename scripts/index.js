const popupUser = document.querySelector('.popup_data_userinfo');
const formUser = document.querySelector('.popup__form_data_userinfo');

const editUserButton = document.querySelector('.profile__edit-button');
const closeUserButton = document.querySelector('.popup__close-button_data_userinfo');
const saveUserButton = document.querySelector('.popup__form-submit-button_data_userinfo');

const pageUserName = document.querySelector('.profile__name');
const pageUserStatus = document.querySelector('.profile__status');

const fieldUserName = document.querySelector('.popup__form-field_data_name');
const fieldUserStatus = document.querySelector('.popup__form-field_data_status');

function fillUserFields() {
  fieldUserName.value = pageUserName.textContent;
  fieldUserStatus.value = pageUserStatus.textContent;
}

function saveUserFields() {
  pageUserName.textContent = fieldUserName.value;
  pageUserStatus.textContent = fieldUserStatus.value;
}

function openUserPopup() {
  popupUser.classList.remove('popup_closed');
  fillUserFields();
}

function closeUserPopup() {
  popupUser.classList.add('popup_closed');
}

function saveUserForm() {
  if (fieldUserName.value && fieldUserStatus.value) {
    saveUserFields();
    closeUserPopup();
  }
}

function disableDefaultSubmit(event) {
  event.preventDefault();
}

editUserButton.addEventListener('click', openUserPopup);
closeUserButton.addEventListener('click', closeUserPopup);
saveUserButton.addEventListener('click', saveUserForm);
formUser.addEventListener('submit', disableDefaultSubmit);


const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_data_addcard');
const addCardPopupCloseButton = document.querySelector('.popup__close-button_data_addcard');
const addCardPopupSubmitButton = document.querySelector('.popup__form-submit-button_data_addcard');
const fieldAddCardTitle = document.querySelector('.popup__form-field_data_card-title');
const fieldAddCardImage = document.querySelector('.popup__form-field_data_card-image');
const formAddCard = document.querySelector('.popup__form_data_addcard');

formAddCard.addEventListener('submit', disableDefaultSubmit);

function openAddCardPopup() {
  addCardPopup.classList.remove('popup_closed');
}

function closeAddCardPopup() {
  addCardPopup.classList.add('popup_closed');
}

addCardButton.addEventListener('click', openAddCardPopup);
addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);
addCardPopupSubmitButton.addEventListener('click', saveAddCardForm);

function addCard() {
  const templateCard = document.querySelector('#card').content;
  const currentCard = templateCard.cloneNode(true);
  const cardImg = currentCard.querySelector('.gallery__photo');
  cardImg.src = fieldAddCardImage.value;
  const cardTitle = currentCard.querySelector('.gallery__title');
  cardTitle.textContent = fieldAddCardTitle.value;
  cardImg.alt = fieldAddCardTitle.value;
  cardContainer.prepend(currentCard);
}

function saveAddCardForm() {
  if (fieldAddCardTitle.value && (fieldAddCardImage.value.startsWith('http://') || fieldAddCardImage.value.startsWith('https://'))) {
    addCard();
    closeAddCardPopup();
  }
}


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


const cardContainer = document.querySelector('.gallery');

function buildCards() {
  const templateCard = document.querySelector('#card').content;
  for (let i = 0; i < initialCards.length; i++) {
    const currentCard = templateCard.cloneNode(true);
    const cardImg = currentCard.querySelector('.gallery__photo');
    cardImg.src = initialCards[i].link;
    const cardTitle = currentCard.querySelector('.gallery__title');
    cardTitle.textContent = initialCards[i].name;
    cardImg.alt = initialCards[i].name;
    cardContainer.append(currentCard);
  }
}

buildCards();