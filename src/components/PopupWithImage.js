import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._popupPicture = document.querySelector('.popup__image');
    this._popupText = document.querySelector('.popup__signature');
  }

  open({title, image}) {
    super.open();
    this._popupPicture.src = image;
    this._popupPicture.alt = title;
    this._popupText.textContent = title;
  }
}