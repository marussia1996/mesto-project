import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callbackSubmit) {
    super(selectorPopup);
    this._callbackSubmit = callbackSubmit;
    this._inputList = Array.from(this._popup.querySelectorAll(".form__item"));
    this._formValues = {};
    this._submitButton = this._popup.querySelector(".form__button");
    this._popupForm = this._popup.querySelector(".form");
  }
  _getInputValues() {
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", () => {
      this._callbackSubmit(this._getInputValues());
    });
  }

  close() {
    // при закрытии отчистим поля формы
    super.close();
    this._popupForm.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = "Сохранить";
    }
  }
}
