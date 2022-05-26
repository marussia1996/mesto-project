import { createCard, elements } from "./card.js";
import {
  openPropfilePopup,
  profile,
  popupEdit,
  popupAdd,
  popupImg,
} from "./modal.js";
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonAdd = profile.querySelector(".profile__add-button");
// //Переменные для кнопок закрытия форм
const buttonClosePopupEdit = popupEdit.querySelector(".popup__toggle");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__toggle");
const buttonClosePopupImg = popupImg.querySelector(".popup__toggle");
//Добавление карточки
function addCard(link, name) {
  elements.prepend(createCard(link, name));
}
// Функции открытия/закрытия попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByEsc);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}
//Функция обработки нажатия на ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
// События при нажатии кнопок
buttonEdit.addEventListener("click", function () {
  openPropfilePopup();
  openPopup(popupEdit);
});
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd);
});
buttonClosePopupEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});
buttonClosePopupAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
buttonClosePopupImg.addEventListener("click", function () {
  closePopup(popupImg);
});
//Массив всех форм
const popups = Array.from(document.querySelectorAll(".popup"));
//Обработчик закрытия форм при нажатии на оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});
export { openPopup, closePopup, addCard };
