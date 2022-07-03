export default class Card {
  constructor({ name, link, likes }, profileId, template) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._profileId = profileId;
    this._cardTemplate = template;
  }
  _getTemplate() {
    return document
      .querySelector(`#${this._cardTemplate}`)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._onLikeClick();
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._onDeleteClick();
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        handleCardClick;
      });
  }
  _isLikedByMe() {
    return this._likes.some((like) => {
      if (like._id === this._profileId) {
        return true;
      }
    });
  }
  _updateCardLikeIcon() {
    if (this._isLikedByMe) {
      this._element
        .querySelector(".element__like")
        .classList.add("element__like_active");
    } else {
      this._element
        .querySelector(".element__like")
        .classList.remove("element__like_active");
    }
    this._element.querySelector(".element__counter-likes").textContent =
      this._likes.length;
  }
  generate() {
    this._element = this._getTemplate();
    this._updateCardLikeIcon();
    this._setEventListeners();
    this._element.querySelector(".element__text").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    return this._element;
  }
}
