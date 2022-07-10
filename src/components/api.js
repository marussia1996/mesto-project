export default class Api {
  constructor({ apiConfig }) {
    this._apiConfig = apiConfig;
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`ошибка ${res.status}`);
  }
  getInfoProfileFromServer() {
    return fetch(`${this._apiConfig.baseUrl}/users/me`, {
      headers: this._apiConfig.headers,
    }).then(this._getResponse);
  }
  getListCards() {
    return fetch(`${this._apiConfig.baseUrl}/cards`, {
      headers: this._apiConfig.headers,
    }).then(this._getResponse);
  }

  renderUserAndCards() {
    return Promise.all([this.getInfoProfileFromServer(), this.getListCards()]);
  }

  changeInfoProfile(nameInput, jobInput) {
    return fetch(`${this._apiConfig.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: nameInput,
        about: jobInput,
      }),
    }).then(this._getResponse);
  }
  addNewCard(nameCard, linkCard) {
    return fetch(`${this._apiConfig.baseUrl}/cards`, {
      method: "POST",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard,
      }),
    }).then(this._getResponse);
  }
  deleteCard(idCard) {
    return fetch(`${this._apiConfig.baseUrl}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._getResponse);
  }
  setLike(idCard) {
    return fetch(`${this._apiConfig.baseUrl}/cards/likes/${idCard}`, {
      method: "PUT",
      headers: this._apiConfig.headers,
    }).then(this._getResponse);
  }
  rejectLike(idCard) {
    return fetch(`${this._apiConfig.baseUrl}/cards/likes/${idCard}`, {
      method: "DELETE",
      headers: this._apiConfig.headers,
    }).then(this._getResponse);
  }
  changeAvatar(linkAvatar) {
    return fetch(`${this._apiConfig.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._apiConfig.headers,
      body: JSON.stringify({
        avatar: linkAvatar,
      }),
    }).then(this._getResponse);
  }
}
