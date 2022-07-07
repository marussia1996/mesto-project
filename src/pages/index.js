import "../pages/index.css";
import Card from "../components/Card1.js";
import {
  addCard,
  setProfileInfoOnPage,
  renderLoadingForButton,
} from "../components/utils/utils.js";
// import { enableValidation } from "../components/validate.js";;
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
  // popupDelete,
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
  validateSelectors,
  userInfoSelectors,
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
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
import PopupWithForm from "../components/PopupWithForm.js";
//Объект Апи
const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    Authorization: "faedd00d-3d28-4943-bdc6-39d59e46ebad",
    "Content-Type": "application/json",
  },
});
let cardSection;
// Объект userInfo
const userInfo = new UserInfo({ selectors: userInfoSelectors });

const popupImage = new PopupWithImage(".popup_type_image");
const popupDelete = new PopupWithForm(".popup_type_delete", () => {});
const popupAddCard = new PopupWithForm(".popup_type_add", (inputs, button) => {
  api
    .addNewCard(inputs.name, inputs.link)
    .then((res) => {
      console.log(res);
      const card = new Card(
        {
          data: res,
          handleCardClick: () => {
            popupImage.open(res);
          },
          handleCardDelete: () => {
            popupDelete.open();
          },
          rejectLike: (setLikes, updateLike) => {
            api
              .rejectLike(res._id)
              .then((res) => {
                setLikes.bind(card)(res.likes);
                updateLike.bind(card)();
              })
              .catch((err) => console.log(`Ошибка при снятии лайка: ${err}`));
          },
          setLike: (setLikes, updateLike) => {
            api
              .setLike(res._id)
              .then((res) => {
                setLikes.bind(card)(res.likes);
                updateLike.bind(card)();
              })
              .catch((err) =>
                console.log(`Ошибка при установке лайка: ${err}`)
              );
          },
        },
        res.owner._id,
        "elem-template"
      );
      const cardElement = card.generate();
      cardSection.prependElement(cardElement);

      console.log(cardSection);

      // cardSection.renderItems();
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`err+ ${err}`);
    });
});
popupAddCard.setEventListeners();
api
  .renderUserAndCards()
  .then(([user, data]) => {
    userInfo.setUserInfo(user);
    cardSection = new Section(
      {
        items: data,
        renderer: (item) => {
          const card = new Card(
            {
              data: item,
              handleCardClick: () => {
                popupImage.open(item);
              },
              handleCardDelete: () => {
                popupDelete.open();
              },
              rejectLike: (setLikes, updateLike) => {
                api
                  .rejectLike(item._id)
                  .then((res) => {
                    setLikes.bind(card)(res.likes);
                    updateLike.bind(card)();
                  })
                  .catch((err) =>
                    console.log(`Ошибка при снятии лайка: ${err}`)
                  );
              },
              setLike: (setLikes, updateLike) => {
                api
                  .setLike(item._id)
                  .then((res) => {
                    setLikes.bind(card)(res.likes);
                    updateLike.bind(card)();
                  })
                  .catch((err) =>
                    console.log(`Ошибка при установке лайка: ${err}`)
                  );
              },
            },
            user._id,
            "elem-template"
          );
          const cardElement = card.generate();
          cardSection.appendElement(cardElement);
        },
      },
      ".elements"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.log(err));

//Объекты валидации форм
const editForm = new FormValidator({ selectors: validateSelectors }, formEdit);
const addForm = new FormValidator({ selectors: validateSelectors }, formAdd);
const changeForm = new FormValidator(
  { selectors: validateSelectors },
  formChangeAvatar
);

//Объект попапа
const pop = new Popup(".popup_type_edit");
// pop.openPopup();
// pop.setEventListeners();

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
  popupAddCard.open();
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
// buttonClosePopupDelete.addEventListener("click", function () {
//   closePopup(popupDelete);
// });
