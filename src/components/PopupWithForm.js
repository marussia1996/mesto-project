import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmit) {
    super(selectorPopup);
    this._callbackSubmit = callbackSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll(".form__item"));
    this._formValues = {};
    this._sumbitButton = this._popup.querySelector(".form__button");
    this._popupForm = this._popup.querySelector(".form");
  }

  _getInputValues() {
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", () => {
      this._callbackSubmit(this._getInputValues(), this._sumbitButton);
    });
  }

  close() {
    // при закрытии отчистим поля формы
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._sumbitButton.textContent = "Сохранение...";
    } else {
      this._sumbitButton.textContent = "Сохранить";
    }
  }
}
