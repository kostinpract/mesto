export default class UserInfo {
  constructor({nameSelector, statusSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      status: this._status.textContent
    };
  }
  setUserInfo({name, status}) {
    this._name.textContent = name;
    this._status.textContent = status;
    console.log(this);
  }
}