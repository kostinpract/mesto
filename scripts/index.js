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