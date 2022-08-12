import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(containerSelector) {
    super(containerSelector);
    this._img = this._container.querySelector('.popup__big-image-photo');
    this._title = this._container.querySelector('.popup__big-image-title');
  }
  open(name, link) {
    super.open();
    this._img.src = link;
    this._img.alt = name;
    this._title.textContent = name;
  }
}