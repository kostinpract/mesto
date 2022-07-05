const enableValidation = (settings) => {
  const formsAll = Array.from(document.querySelectorAll(settings.formSelector));
  formsAll.forEach( (formElement) => {
    addElementListeners(
      formElement,
      settings.inputSelector,
      settings.submitButtonSelector,
      settings.inactiveButtonClass,
      settings.inputErrorClass,
      settings.errorClass
    );
    formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });
  });
}

const hasInvalidField = (fieldsList) => {
  return fieldsList.some( (input) => {
    return !input.validity.valid;
  });
}

const toggleButtonActive = (fieldsList, buttonElement, inactiveButtonClass) => {
  if(hasInvalidField(fieldsList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

const hideError = (formElement, formField, inputErrorClass, errorClass) => {
  formField.classList.remove(inputErrorClass);
  const span = formElement.querySelector(`.popup__form-warning_field_${formField.id}`);
  span.classList.remove(errorClass);
}

const showError = (formElement, formField, formFieldError, inputErrorClass, errorClass) => {
  formField.classList.add(inputErrorClass);
  const span = formElement.querySelector(`.popup__form-warning_field_${formField.id}`);
  span.classList.add(errorClass);
  span.textContent = formFieldError;
}

const toggleErrors = (evt, formElement, formField, inputErrorClass, errorClass) => {
  if(evt.target.validity.valid) {
    hideError(formElement, formField, inputErrorClass, errorClass);
  } else {
    showError(formElement, formField, formField.validationMessage, inputErrorClass, errorClass);
  }
}

const addElementListeners = (formElement, inputSelector, submitSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const formFields = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitSelector);
  toggleButtonActive(formFields, buttonElement, inactiveButtonClass);
  formFields.forEach( (formField) => {
    formField.addEventListener('input', (evt) => {
      toggleErrors(evt, formElement, formField, inputErrorClass, errorClass);
      toggleButtonActive(formFields, buttonElement, inactiveButtonClass);
    });
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-field',
  submitButtonSelector: '.popup__form-submit-button',
  inactiveButtonClass: 'popup__form-submit-button_error',
  inputErrorClass: 'popup__form-field_error',
  errorClass: 'popup__form-warning_active'
});