import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(containerSelector, handleFormSubmit) {
    super(containerSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._container.querySelector('.popup__form');
    this._inputList = this._container.querySelectorAll('.popup__form-field');
    this._submitButton = this._container.querySelector('.popup__form-submit-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  _setInputValues(inputValues) {
    this._inputList.forEach(input => {
      if(inputValues[input.name]) {
        input.value = inputValues[input.name];
        console.log('input name: '+input.name);
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    });
  }

  open(inputValues) {
    super.open();
    this._setInputValues(inputValues);
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(isLoading) {
    if (isLoading) {
      this._submitButton.disabled = true;
      this._submitButton.textContent = 'Сохранение…';
    } else {
      this._submitButton.disabled = false;
      this._submitButton.textContent = 'Сохранить';
    }
  }
}