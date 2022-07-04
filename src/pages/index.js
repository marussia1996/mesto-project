import "../pages/index.css";
import Card from "../components/Card1.js";
import {
  addCard,
  setProfileInfoOnPage,
  renderLoadingForButton,
} from "../components/utils/utils.js";
// import { enableValidation } from "../components/validate.js";
import {
  openPropfilePopup,
  handleProfileFormSubmit,
  handleAddCardFormSubmit,
  handleChangeAvatarFormSubmit,
  handleDeleteCardFormSubmit,
  openPopup,
  closePopup,
} from "../components/modal.js";
import {
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  popupEdit,
  popupAdd,
  popupChangeAvatar,
  popupImg,
  popupDelete,
  formsSelector,
  formEditClass,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
  profileAvatar,
  buttonClosePopupEdit,
  buttonClosePopupAdd,
  buttonClosePopupImg,
  buttonClosePopupChange,
  buttonClosePopupDelete,
  formAdd,
  formEdit,
  formChangeAvatar,
} from "../components/utils/constants.js";
import {
  getListCards,
  getInfoProfileFromServer,
  setLike,
  rejectLike,
  changeInfoProfile,
  addNewCard,
  deleteCard,
  changeAvatar,
} from "../components/api.js";
import { updateCardLikeIcon, handleDeleteElement } from "../components/card.js";
import Api from "../components/Api1.js";
import FormValidator from "../components/FormValidator1";
//Объект Апи
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    Authorization: "faedd00d-3d28-4943-bdc6-39d59e46ebad",
    "Content-Type": "application/json",
  },
});

window.onload = function () {
  api.getInfoProfileFromServer().then((user) => {
    console.log(user);
  });
};
//Объекты валидации форм
const editForm = new FormValidator(
  {
    formSelector: formsSelector,
    formEditClass: formEditClass,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: inputErrorClass,
    errorClass: errorClass,
  },
  formEdit
);
console.log(editForm);
const addForm = new FormValidator(
  {
    formSelector: formsSelector,
    formEditClass: formEditClass,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: inputErrorClass,
    errorClass: errorClass,
  },
  formAdd
);
console.log(addForm);
const changeForm = new FormValidator(
  {
    formSelector: formsSelector,
    formEditClass: formEditClass,
    inputSelector: inputSelector,
    submitButtonSelector: submitButtonSelector,
    inactiveButtonClass: inactiveButtonClass,
    inputErrorClass: inputErrorClass,
    errorClass: errorClass,
  },
  formChangeAvatar
);
console.log(changeForm);

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
  .then(([profileInfo, cardsList]) => {
    //Заполнение данных пользователя
    setProfileInfoOnPage(profileInfo);
    //Заполнение страницы карточками
    cardsList.reverse().forEach((cardData) => {
      addCard(
        cardData,
        profileInfo.profileId,
        handelCardLikeClick,
        onCardDelete,
        handelCardDeleteClick
      );
    });
    popupAdd.addEventListener("submit", () => {
      handleAddCardFormSubmit((mestoInput, linkInput) =>
        onPostNewCard(
          mestoInput,
          linkInput,
          profileInfo.profileId,
          handelCardLikeClick,
          onCardDelete,
          handelCardDeleteClick
        )
      );
    });
  })
  .catch((err) =>
    console.log(`Ошибка при получении данных пользователя: ${err}`)
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
function handelCardDeleteClick(popup, cardId, element, onCardDelete) {
  openPopup(popup);
  popup.querySelector(".popup__button").addEventListener("click", () => {
    handleDeleteCardFormSubmit(cardId, element, onCardDelete);
  });
}
function onCardDelete(popup, cardElement, idCard) {
  deleteCard(idCard)
    .then((res) => {
      closePopup(popup);
      handleDeleteElement(cardElement.closest(".element"));
    })
    .catch((err) => console.log(`Ошибка при удалении: ${err}`));
}
function onChangeAvatar(linkAvatar) {
  changeAvatar(linkAvatar)
    .then(
      (link) => (profileAvatar.style.backgroundImage = `url(${link.avatar})`)
    )
    .catch((err) => console.log(`Ошибка при изменении аватара:${err}`))
    .finally(() => renderLoadingForButton(false, popupChangeAvatar));
}
function onChangeInfoProfile(nameInput, jobInput) {
  changeInfoProfile(nameInput, jobInput)
    .then(() => closePopup(popupEdit))
    .catch((err) => console.log(`Ошибка при изменении данных: ${err}`))
    .finally(() => renderLoadingForButton(false, popupEdit));
}
function onPostNewCard(
  mestoInput,
  linkInput,
  profileId,
  handelCardLikeClick,
  onCardDelete,
  handelCardDeleteClick
) {
  addNewCard(mestoInput, linkInput)
    .then((card) =>
      addCard(
        card,
        profileId,
        handelCardLikeClick,
        onCardDelete,
        handelCardDeleteClick
      )
    )
    .catch((err) => console.log(`Ошибка при добавлении:${err}`))
    .finally(() => renderLoadingForButton(false, popupAdd));
}
//Валидация форм
// enableValidation({
//   formSelector: formsSelector,
//   formEditClass: formEditClass,
//   inputSelector: inputSelector,
//   submitButtonSelector: submitButtonSelector,
//   inactiveButtonClass: inactiveButtonClass,
//   inputErrorClass: inputErrorClass,
//   errorClass: errorClass,
// });
//События отправки форм
popupEdit.addEventListener("submit", () =>
  handleProfileFormSubmit(onChangeInfoProfile)
);
popupChangeAvatar.addEventListener("submit", () =>
  handleChangeAvatarFormSubmit(onChangeAvatar)
);
// События при нажатии кнопок
buttonEdit.addEventListener("click", function () {
  openPropfilePopup();
  openPopup(popupEdit);
  editForm.enableValidation();
});
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd);
  addForm.enableValidation();
});
buttonChangeAvatar.addEventListener("click", function () {
  openPopup(popupChangeAvatar);
  changeForm.enableValidation();
});
//Обработка закрытия по крестику
buttonClosePopupEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});
buttonClosePopupAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
buttonClosePopupImg.addEventListener("click", function () {
  closePopup(popupImg);
});
buttonClosePopupChange.addEventListener("click", function () {
  closePopup(popupChangeAvatar);
});
buttonClosePopupDelete.addEventListener("click", function () {
  closePopup(popupDelete);
});

const testCard = new Card(
  {
    name: "Test",
    link: "https://images.unsplash.com/photo-1647148559169-ba5c41fc06ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    countLikes: 4,
    handelCardClick: (name, link) => {
      openPopup(popupImg);
      image.src = link;
      image.alt = name;
      signature.textContent = name;
    },
  },
  0,
  "elem-template"
);
console.log(testCard);
