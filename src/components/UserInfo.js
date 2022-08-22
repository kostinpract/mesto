export default class UserInfo {
  constructor({nameSelector, statusSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      status: this._status.textContent,
      avatar: this._avatar.src
    };
  }
  setUserInfo({name, status, avatar}) {
    this._name.textContent = name;
    this._status.textContent = status;
    this._avatar.src = avatar;
  }
}