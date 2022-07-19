import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup, { callbackSubmit }) {
    super(selectorPopup);
    this._callbackSubmit = callbackSubmit;
    this._submitBtn = document
      .querySelector(selectorPopup)
      .querySelector(".popup__button");
  }

  setEventListeners() {
    this._submitBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._id);
    });
    super.setEventListeners();
  }

  open(cardId) {
    this._id = cardId;
    super.open();
  }
}
