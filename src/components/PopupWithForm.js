import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(containerSelector, handleFormSubmit) {
    super(containerSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._container.querySelector('.popup__form');
    this._inputList = this._container.querySelectorAll('.popup__form-field');
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
      }
    });
  }
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._form.reset();
    });
    addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_shown')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }
  open(inputValues) {
    super.open();
    this._setInputValues(inputValues);
  }
  close() {
    this._container.classList.remove('popup_shown');
    window.removeEventListener('keydown', this._handleEscClose);
    Popup.popupOpened = null;
    this._form.reset();
  }
}