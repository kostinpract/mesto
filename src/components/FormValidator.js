export default class FormValidator {

  constructor(settings, formElement) {
    this._formElement = formElement;

    // создаём поле-массив, в каждый его элемент кладём
    // объект с инпутом и span-ошибкой для этого инпута
    this._formFields = [];
    const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputs.forEach( (input) => {
      const formField = {
        field: input,
        error: formElement.querySelector(`.popup__form-warning_field_${input.id}`)
      }
      this._formFields.push(formField);
    });

    this._formButton = formElement.querySelector(settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._messageErrorClass = settings.messageErrorClass;
  }

  // проверяем есть ли в полях ошибки валидации
  _hasInvalidField() {
    return this._formFields.some( (formField) => {
      return !formField.field.validity.valid;
    });
  }

  // активируем кнопку
  _enableButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.disabled = false;
  }

  // деактивируем кнопку
  _disableButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.disabled = true;
  }

  // меняем видимость кнопки на противоположенную
  _toggleButtonActivity() {
    if (this._hasInvalidField()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // прячем span с сообщениеем об ошибке для поля
  _hideFieldError(formField) {
    formField.field.classList.remove(this._inputErrorClass);
    formField.error.classList.remove(this._messageErrorClass);
  }

  // показываем span с сообщениеем об ошибке для поля
  _showFieldError(formField) {
    formField.field.classList.add(this._inputErrorClass);
    formField.error.classList.add(this._messageErrorClass);
    formField.error.textContent = formField.field.validationMessage;
  }

  // меняем видимость span с ошибкой на противоположенную
  _toggleFieldError(evt, formField) {
    if(evt.target.validity.valid) {
      this._hideFieldError(formField);
    } else {
      this._showFieldError(formField);
    }
  }

  // добавляем обработчики на каждое поле, чтобы менять
  // видимость кнопки и span с ошибкой
  _addFieldListener(formField) {
    formField.field.addEventListener('input', (evt) => {
      this._toggleButtonActivity();
      this._toggleFieldError(evt, formField);
    });
  }

  // публичный метод для включения валидации на форме
  enableValidation() {
    // изначально деактивируем кнопку
    this._toggleButtonActivity();
    // добавляем обработчик на каждое поле
    this._formFields.forEach( (formField) => {
      this._addFieldListener(formField);
    });
    this._formElement.addEventListener('reset', (evt) => {
      // «портим» все поля, чтобы после сброса формы задизейблилась кнопка
      // this._formFields.forEach( (formField) => {
      //   formField.field.value = undefined;
      // });
      this._toggleButtonActivity();
    });
  }

}