import { formSubmitHandlerEdit, formSubmitHandlerAdd } from "./modal.js";
//Показ ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};
//Скрытие ошибки
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};
//Проверка валидности поля
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};
//Добавление обработчика на поля
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (!formElement.classList.contains("form_type_edit")) {
    toggleButtonState(inputList, buttonElement, config);
  }
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement, config);
      checkInputValidity(formElement, inputElement, config);
    });
  });
};
//Для каждой формы добавление валидации полей и функций отправки
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      if (evt.target.classList.contains("form_type_edit")) {
        formSubmitHandlerEdit();
      }
      if (evt.target.classList.contains("form_type_add")) {
        formSubmitHandlerAdd();
      }
    });
    setEventListeners(formElement, config);
  });
};
//Проверка валидности всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};
//Состояние кнопки
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};
