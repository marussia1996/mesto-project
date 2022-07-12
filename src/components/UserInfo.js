export default class UserInfo {
  constructor({ selectors }) {
    this._name = document.querySelector(selectors.nameSelector);
    this._about = document.querySelector(selectors.aboutSelector);
    this._avatar = document.querySelector(selectors.avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }
  setUserInfo({ name, about, avatar, _id }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
    this._id = _id;
  }
}
