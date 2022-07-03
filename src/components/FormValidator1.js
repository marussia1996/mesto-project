export default class FormValidator {
  constructor(
    {
      formEditClass,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    formElement
  ) {
    this._formEditClass = formEditClass;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  //Показ ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }
  //Скрытие ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }
  //Для каждой формы добавление валидации полей и функций отправки
  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  //Проверка валидности всех полей
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }
  //Проверка валидности поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  //Состояние кнопки
  toggleButtonState() {
    if (this._hasInvalidInput(this.inputList)) {
      this.buttonElement.classList.add(this._inactiveButtonClass);
      this.buttonElement.setAttribute("disabled", "disabled");
    } else {
      this.buttonElement.classList.remove(this._inactiveButtonClass);
      this.buttonElement.removeAttribute("disabled");
    }
  }
  //Добавление обработчика на поля
  _setEventListeners() {
    // const inputList = Array.from(
    //   this._formElement.querySelectorAll(this._inputSelector)
    // );
    // const buttonElement = this._formElement.querySelector(
    //   this._submitButtonSelector
    // );
    if (!this._formElement.classList.contains(this._formEditClass)) {
      this.toggleButtonState();
    }
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this.toggleButtonState();
        // this._checkInputValidity();
      });
    });
  }
}
