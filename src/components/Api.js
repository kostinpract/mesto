export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkResponse(res));
  }

  setUserAvatar(url) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
      .then(res => this._checkResponse(res));
  }

  likeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  dislikeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes ', {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  addNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkResponse(res));
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }
}