import { renderLoadingForButton } from "./utils.js";
import { toggleButtonState } from "./validate.js";
import {
  formName,
  formJob,
  profileName,
  profileJob,
  popupEdit,
  formAdd,
  popupAdd,
  formMesto,
  formLink,
  popupDelete,
  popups,
  linkChangeAvatar,
  popupChangeAvatar,
  formChangeAvatar,
} from "./utils/constants.js";
// Функции открытия/закрытия попап
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}
//Функция обработки нажатия на ESC
function closePopupByEsc(evt) {
  const activePopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(activePopup);
  }
}
//Обработчик закрытия форм при нажатии на оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});
// Функция для полей при открытии формы редактирования информации о пользователе
export function openPropfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}
//Функции отправки формы
export function handleProfileFormSubmit(onChangeInfoProfile) {
  // Получите значение полей jobInput и nameInput из свойства value
  const nameInput = formName.value;
  const jobInput = formJob.value;
  // Выберите элементы, куда должны быть вставлены значения полей && Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  renderLoadingForButton(true, popupEdit.querySelector(".form__button"));
  onChangeInfoProfile(nameInput, jobInput);
}
export function handleAddCardFormSubmit(onPostNewCard) {
  const mestoInput = formMesto.value;
  const linkInput = formLink.value;
  const inputList = Array.from(formAdd.querySelectorAll(".form__item"));
  const buttonElement = formAdd.querySelector(".form__button");
  renderLoadingForButton(true, popupAdd.querySelector(".form__button"));
  onPostNewCard(mestoInput, linkInput);
  closePopup(popupAdd);
  formAdd.reset();
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: "form__button_inactive",
  });
}
export function handleDeleteCardFormSubmit(idCard, cardElement, onCardDelete) {
  onCardDelete(popupDelete, cardElement, idCard);
}
export function handleChangeAvatarFormSubmit(onChangeAvatar) {
  const linkAvatar = linkChangeAvatar.value;
  renderLoadingForButton(
    true,
    popupChangeAvatar.querySelector(".form__button")
  );
  onChangeAvatar(linkAvatar);
  const inputList = Array.from(
    formChangeAvatar.querySelectorAll(".form__item")
  );
  const buttonElement = formChangeAvatar.querySelector(".form__button");
  closePopup(popupChangeAvatar);
  formChangeAvatar.reset();
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: "form__button_inactive",
  });
}
