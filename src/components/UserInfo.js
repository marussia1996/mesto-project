export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = nameSelector;
    this._aboutSelector = aboutSelector;
    this._name = document.querySelector(this._nameSelector);
    this._about = document.querySelector(this._aboutSelector);
  }
  getUserInfo() {
    return { name: this._name, about: this._about };
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
  }
}
