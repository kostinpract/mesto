let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');

let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__form-submit-button');

let pageName = document.querySelector('.profile__name');
let pageStatus = document.querySelector('.profile__status');

let fieldName = document.querySelector('.popup__form-field_data_name');
let fieldStatus = document.querySelector('.popup__form-field_data_status');

function fillFields() {
  fieldName.value = pageName.textContent;
  fieldStatus.value = pageStatus.textContent;
}

function saveFields() {
  pageName.textContent = fieldName.value;
  pageStatus.textContent = fieldStatus.value;
}

function openPopup() {
  popup.classList.remove('popup_closed');
  fillFields();
}

function closePopup() {
  popup.classList.add('popup_closed');
}

function saveForm() {
  if (fieldName.value && fieldStatus.value) {
    saveFields();
    closePopup();
  }
}

function disableDefaultSubmit(event) {
  event.preventDefault();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', saveForm);
form.addEventListener('submit', disableDefaultSubmit);


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