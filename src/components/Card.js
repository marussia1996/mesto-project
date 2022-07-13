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
    this._likeButton.addEventListener("click", () => {
      if (this._isLikedByMe()) {
        this._rejectLike(this._setLikes, this._updateCardLikeIcon);
      } else {
        this._setLike(this._setLikes, this._updateCardLikeIcon);
      }
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }
  _isLikedByMe() {
    return this._likes.some((like) => like._id === this._profileId);
  }
  _updateTrashIcon() {
    if (this._profileId !== this._ownerId) {
      this._deleteButton.remove();
    }
  }
  setLikes(likes) {
    this._likes = likes;
  }
  updateCardLikeIcon() {
    if (this._isLikedByMe()) {
      this._likeButton.classList.add("element__like_active");
    } else {
      this._likeButton.classList.remove("element__like_active");
    }
    this._likeCounter.textContent = this._likes.length;
  }
  generate() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._cardText = this._element.querySelector(".element__text");
    this._likeButton = this._element.querySelector(".element__like");
    this._likeCounter = this._element.querySelector(".element__counter-likes");
    this._deleteButton = this._element.querySelector(".element__delete");
    this._cardText.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this.updateCardLikeIcon();
    this._setEventListeners();
    this._updateTrashIcon();
    return this._element;
  }
}
