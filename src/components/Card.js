export default class Card {
  constructor (
      {id, name, link, likes, isMyLike, ownerId},
      templateSelector,
      handleCardClick,
      handleCardLike,
      handleCardDelete
    ) {
    this._id = id;
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._likesCount = likes.length;
    this._isMyLike = isMyLike;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    // console.log(this);
  }

  // статическое свойство для хранения моего ID
  static myId = null;

  _checkIsMyCard() {
    return this._ownerId === Card.myId;
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
    this._elementCount = this._element.querySelector('.gallery__like-count');

    this._elementPhoto.src = this._image;
    this._elementPhoto.alt = this._title;
    this._elementTitle.textContent = this._title;
    this._elementCount.textContent = this._likesCount;

    if (this._isMyLike) {
      this._elementLike.classList.add('gallery__like-button_active');
    }

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
    if (Card.myId && this._checkIsMyCard()) {
      this._elementTrash.addEventListener( 'click', () => {
        this._handleRemoveClick();
      });
    } else {
      this._elementTrash.remove();
    }
  }

  _handleLikeClick() {
    this._handleCardLike();
  }

  _handleRemoveClick() {
    this._handleCardDelete(this._element);
  }

}