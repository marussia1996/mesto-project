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
  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
    //this._avatar.src = user.avatar;
    this._avatar.style.backgroundImage = `url(${user.avatar})`;
  }
  setUserAvatar(avatar) {
    this._avatar.src = avatar;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
}
