import "./pages/index.css";
import { initialCards as cards, addCard } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
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
