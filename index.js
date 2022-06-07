let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-button');
let saveButton = document.querySelector('.popup__form-submit-button');

let pageName = document.querySelector('.profile__name');
let pageStatus = document.querySelector('.profile__status');

let fieldName = document.querySelector('.popup__form-field_name');
let fieldStatus = document.querySelector('.popup__form-field_status');

function openPopup() {
  popup.classList.remove('popup_closed');
  fieldName.value = pageName.textContent;
  fieldStatus.value = pageStatus.textContent;
}

function closePopup() {
  popup.classList.add('popup_closed');
}

function savePopup() {
  pageName.textContent = fieldName.value;
  pageStatus.textContent = fieldStatus.value;
  popup.classList.add('popup_closed');
}

editButton.addEventListener('click',openPopup);
closeButton.addEventListener('click',closePopup);
saveButton.addEventListener('click',savePopup);