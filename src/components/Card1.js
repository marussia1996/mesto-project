export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, rejectLike, setLike },
    profileId,
    template
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._rejectLike = rejectLike;
    this._setLike = setLike;
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
        if (this._isLikedByMe()) {
          this._rejectLike(this._setLikes, this._updateCardLikeIcon);
        } else {
          this._setLike(this._setLikes, this._updateCardLikeIcon);
        }
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
    // console.log("here");
    // console.log(likes);
    console.log(this._likes);
    return this._likes.some((like) => like._id === this._profileId);
  }

  _updateTrashIcon() {
    if (this._profileId !== this._ownerId) {
      this._element.querySelector(".element__delete").remove();
    }
  }

  _setLikes(likes) {
    this._likes = likes;
  }

  _updateCardLikeIcon() {
    // console.log("here2");
    // console.log(likes);
    console.log(this);
    if (this._isLikedByMe()) {
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
    this._updateTrashIcon();
    this._element.querySelector(".element__text").textContent = this._name;
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    return this._element;
  }
}
