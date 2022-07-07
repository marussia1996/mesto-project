export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, handleLikeClick },
    profileId,
    template
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._profileId = profileId;
    this._ownerId = data.owner._id;
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
        // console.log(this._name);
        this._handleLikeClick();
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }
  _isLikedByMe() {
    return this._likes.some((like) => like._id === this._profileId);
  }

  _updateTrashIcon() {
    if (this._profileId !== this._ownerId) {
      this._element.querySelector(".element__delete").remove();
    }
  }

  _updateCardLikeIcon() {
    if (this._isLikedByMe()) {
      this._element
        .querySelector(".element__like")
        .classList.add("element__like_active");
      // console.log("наш");
    } else {
      this._element
        .querySelector(".element__like")
        .classList.remove("element__like_active");
      // console.log("не наш");
    }
    this._element.querySelector(".element__counter-likes").textContent =
      this._likes.length;
    // console.log("update");
  }
  generate() {
    this._element = this._getTemplate();
    this._updateCardLikeIcon();
    this._setEventListeners();
    this._updateTrashIcon();
    this._element.querySelector(".element__text").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    return this._element;
  }
}
