import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupPicture = document.querySelector(".popup__image");
    this._popupText = document.querySelector(".popup__signature");
  }

  open({ name, link }) {
    super.open();
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupText.textContent = name;
  }
}
