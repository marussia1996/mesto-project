export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }
  getUserInfo() {
    return { name: this._name, about: this._about };
  }
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
  }
}
