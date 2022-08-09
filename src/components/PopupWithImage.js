export default class PopupWithImage extends Popup {
  constructor(containerSelector) {
    super(containerSelector);
  }
  // открыть попап и навесить обработчик на Escape
  open() {
    this._container.classList.add('popup_shown');
    popupOpened = this;
    window.addEventListener('keydown', _handleEscClose);
  }
}