export default class Popup {
  // переменная для хранения элемента открытого попапа
  static popupOpened;

  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  // открыть попап и навесить обработчик на Escape
  open() {
    this._container.classList.add('popup_shown');
    window.addEventListener('keydown', this._handleEscClose);
    Popup.popupOpened = this;
  }

  // закрыть попап и убрать обработчик с Escape
  close() {
    this._container.classList.remove('popup_shown');
    window.removeEventListener('keydown', this._handleEscClose);
    Popup.popupOpened = null;
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      Popup.popupOpened.close();
    }
  }

  setEventListeners() {
    addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_shown')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    });
  }

}