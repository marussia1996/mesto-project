import { renderLoadingForButton, handleDeleteElement } from "./utils.js";
import { toggleButtonState } from "./validate.js";
import {
  popupImg,
  image,
  signature,
  formName,
  formJob,
  profileName,
  profileJob,
  popupEdit,
  formAdd,
  popupAdd,
  formMesto,
  formLink,
  popups,
  linkChangeAvatar,
  popupChangeAvatar,
  formChangeAvatar,
  buttonClosePopupEdit,
  buttonClosePopupAdd,
  buttonClosePopupImg,
  buttonClosePopupChange,
} from "./constants.js";
//Функция передачи параметров для попапа с картинкой
export function handleCardClick(name, link) {
  openPopup(popupImg, false);
  image.src = link;
  image.alt = name;
  signature.textContent = name;
}
// Функции открытия/закрытия попап
export function openPopup(popup, popupDeleted) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", (evt) =>
    closePopupByEsc(evt, popup, popupDeleted)
  );
}
export function closePopup(popup, popupDeleted) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", (evt) =>
    closePopupByEsc(evt, popup, popupDeleted)
  );
}
//Функция обработки нажатия на ESC
function closePopupByEsc(evt, popup, popupDeleted) {
  if (evt.key === "Escape") {
    closePopup(popup);
    if (popupDeleted) {
      deletePopup(popup);
    }
  }
}
//Обработка закрытия по крестику
buttonClosePopupEdit.addEventListener("click", function () {
  closePopup(popupEdit, false);
});
buttonClosePopupAdd.addEventListener("click", function () {
  closePopup(popupAdd, false);
});
buttonClosePopupImg.addEventListener("click", function () {
  closePopup(popupImg, false);
});
buttonClosePopupChange.addEventListener("click", function () {
  closePopup(popupChangeAvatar, true);
});
//Обработчик закрытия форм при нажатии на оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup, false);
    }
  });
});
// Функция для полей при открытии формы редактирования информации о пользователе
export function openPropfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}
//Функция создания попапа удаления для карточки
const popupDelTemplate = document.querySelector("#popupDel-template").content;
export function createPopup(cardElement, idCard, onCardDelete) {
  const popupTemplate = popupDelTemplate.querySelector(".popup");
  const popup = popupTemplate.cloneNode(true);
  popup.querySelector(".popup__button").addEventListener("click", function () {
    onCardDelete(popup, cardElement, idCard);
  });
  popup.querySelector(".popup__toggle").addEventListener("click", function () {
    closePopup(popup, true);
    deletePopup(popup);
  });
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup, true);
      deletePopup(popup);
    }
  });
  return popup;
}
//функция удаления попапа
export function deletePopup(popup) {
  handleDeleteElement(popup);
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
  closePopup(popupAdd, false);
  formAdd.reset();
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: "form__button_inactive",
  });
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
  closePopup(popupChangeAvatar, false);
  formChangeAvatar.reset();
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: "form__button_inactive",
  });
}
