import "../pages/index.css";
import { initialCards as cards } from "./constants.js";
import { addCard } from "./utils.js";
import { enableValidation } from "./validate.js";
import {
  popupAdd,
  popupEdit,
  handleProfileFormSubmit,
  handleAddCardFormSubmit,
} from "./modal.js";
//Заполнение страницы 6 карточками
for (let i = 5; i >= 0; i--) {
  addCard(cards[i].link, cards[i].name);
}
//Валидация форм
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
});
//События отправки форм
popupAdd.addEventListener("submit", handleAddCardFormSubmit);
popupEdit.addEventListener("submit", handleProfileFormSubmit);
