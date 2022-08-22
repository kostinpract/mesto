export default class Card {

  constructor(title, image, templateSelector, handleCardClick, handleCardDelete) {
    this._title = title;
    this._image = image;
    this._isLiked = false;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getElement() {
  	const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gallery__item')
      .cloneNode(true);

    return cardElement;
  }

  generate() {
    this._element = this._getElement();

    this._elementPhoto = this._element.querySelector('.gallery__photo');
    this._elementTitle = this._element.querySelector('.gallery__title');
    this._elementTrash = this._element.querySelector('.gallery__remove-button');
    this._elementLike = this._element.querySelector('.gallery__like-button');

    this._elementPhoto.src = this._image;
    this._elementPhoto.alt = this._title;
    this._elementTitle.textContent = this._title;

    this._setEventListeners();

  	return this._element;
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener('click', () => {
			this._handleCardClick();
		});
    this._elementLike.addEventListener( 'click', () => {
			this._handleLikeClick();
		});
    this._elementTrash.addEventListener( 'click', () => {
			this._handleRemoveClick();
		});
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle('gallery__like-button_active');
  }

  _handleRemoveClick() {
    this._handleCardDelete(this._element);
  }

}