import "../pages/index.css";
import { addCard, setProfileInfoOnPage } from "./utils.js";
import { enableValidation } from "./validate.js";
import {
  openPropfilePopup,
  handleProfileFormSubmit,
  handleAddCardFormSubmit,
  handleChangeAvatarFormSubmit,
  openPopup,
} from "./modal.js";
import {
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  popupEdit,
  popupAdd,
  popupChangeAvatar,
  formsSelector,
  formEditClass,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
} from "./constants.js";
import {
  getListCards,
  getInfoProfileFromServer,
  setLike,
  rejectLike,
} from "./api.js";
import { updateCardLikeIcon } from "./card.js";
//Получение данных о пользователе
const getInfoProfile = () => {
  return getInfoProfileFromServer()
    .then((data) => {
      return {
        profileId: data._id,
        profileName: data.name,
        profileJob: data.about,
        profileAvatar: data.avatar,
      };
    })
    .catch((err) => {
      console.log(`Не удалось получить данные пользователя: ${err}`);
    });
};
Promise.all([getInfoProfile(), getListCards()])
  .then((values) => {
    //Заполнение данных пользователя
    setProfileInfoOnPage(values[0]);
    //Заполнение страницы карточками
    values[1].reverse().forEach((cardData) => {
      addCard(cardData, values[0].profileId, handelCardLikeClick);
    });
    popupAdd.addEventListener("submit", () => {
      handleAddCardFormSubmit(values[0].profileId);
    });
  })
  .catch((err) =>
    console.log(`Ошибка при получении данных пользовтеля: ${err}`)
  );
function handelCardLikeClick(card, cardLikeBtn, cardData, profileId) {
  if (cardLikeBtn.classList.contains("element__like_active")) {
    rejectLike(cardData._id)
      .then((newCardData) => {
        updateCardLikeIcon(card, newCardData, profileId);
      })
      .catch((err) => console.log(`Ошибка при снятии лайка: ${err}`));
  } else {
    setLike(cardData._id)
      .then((newCardData) => {
        updateCardLikeIcon(card, newCardData, profileId);
      })
      .catch((err) => console.log(`Ошибка при установке лайка: ${err}`));
  }
}
//Валидация форм
enableValidation({
  formSelector: formsSelector,
  formEditClass: formEditClass,
  inputSelector: inputSelector,
  submitButtonSelector: submitButtonSelector,
  inactiveButtonClass: inactiveButtonClass,
  inputErrorClass: inputErrorClass,
  errorClass: errorClass,
});
//События отправки форм
popupEdit.addEventListener("submit", handleProfileFormSubmit);
popupChangeAvatar.addEventListener("submit", handleChangeAvatarFormSubmit);
// События при нажатии кнопок
buttonEdit.addEventListener("click", function () {
  openPropfilePopup();
  openPopup(popupEdit, false);
});
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd, false);
});
buttonChangeAvatar.addEventListener("click", function () {
  openPopup(popupChangeAvatar, false);
});
