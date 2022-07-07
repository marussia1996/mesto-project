import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(selectorPopup, { callbackSubmit }) {
    super(selectorPopup);
    this._form = this._popup.querySelector(".form_type_delete");
    this._callbackSubmit = callbackSubmit;
    this._submitEvt = this._submitEvt.bind(this);
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._submitEvt);
    super.setEventListeners();
  }

  _submitEvt(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._id);
  }

  open(cardId) {
    this._id = cardId;
    super.open();
  }
}
