import { createCard, elements } from "./card.js";
import {
  openPropfilePopup,
  profile,
  popupEdit,
  popupAdd,
  popupImg,
  deletePopup,
} from "./modal.js";
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonAdd = profile.querySelector(".profile__add-button");
// //Переменные для кнопок закрытия форм
const buttonClosePopupEdit = popupEdit.querySelector(".popup__toggle");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__toggle");
const buttonClosePopupImg = popupImg.querySelector(".popup__toggle");
//Добавление карточки
function addCard(cardData, profileId) {
  elements.prepend(createCard(cardData, profileId));
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
    if (
      document
        .querySelector(".popup_opened")
        .classList.contains("popup_type_delete")
    ) {
      closePopup(document.querySelector(".popup_opened"));
      setTimeout(deletePopup, 1000);
    } else {
      closePopup(document.querySelector(".popup_opened"));
    }
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
