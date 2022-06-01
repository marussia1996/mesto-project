import "../pages/index.css";
import { addCard } from "./utils.js";
import { enableValidation } from "./validate.js";
import {
  popupAdd,
  popupEdit,
  handleProfileFormSubmit,
  handleAddCardFormSubmit,
} from "./modal.js";
import { getInfoProfile, setProfileInfoOnPage } from "./profile.js";
import { getListCards } from "./api.js";

//Сохранение данных пользователя
getInfoProfile().then((profileInfo) => {
  //Заполнение данных пользователя
  setProfileInfoOnPage(profileInfo);
  //Заполнение страницы карточками
  getListCards()
    .then((cards) => {
      cards.reverse().forEach((card) => {
        addCard(card, profileInfo.profileId);
      });
    })
    .catch((error) => {
      console.log(`Не удалось загрузить данные: ${error}`);
    });
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
  popupAdd.addEventListener("submit", () => {
    handleAddCardFormSubmit(profileInfo.profileId);
  });
  popupEdit.addEventListener("submit", handleProfileFormSubmit);
});
