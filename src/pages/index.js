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

function createNewCard(item, ownerId) {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        popupImage.open(item);
      },
      handleCardDelete: () => {
        popupDelete.open(item._id);
      },
      rejectLike: (setLikes, updateLike) => {
        api
          .rejectLike(item._id)
          .then((item) => {
            setLikes.bind(card)(item.likes);
            updateLike.bind(card)();
          })
          .catch((err) => console.log(`Ошибка при снятии лайка: ${err}`));
      },
      setLike: (setLikes, updateLike) => {
        api
          .setLike(item._id)
          .then((item) => {
            setLikes.bind(card)(item.likes);
            updateLike.bind(card)();
          })
          .catch((err) => console.log(`Ошибка при установке лайка: ${err}`));
      },
    },
    ownerId,
    "elem-template"
  );
  return card.generate();
}

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
const popupDelete = new PopupWithConfirm(".popup_type_delete", {
  callbackSubmit: (id) => {
    console.log(id);
    api
      .deleteCard(id)
      .then((res) => {
        popupDelete.close();

        // closePopup(popup);
        // handleDeleteElement(cardElement.closest(".element"));
      })
      .catch((err) => console.log(`Ошибка при удалении: ${err}`));
  },
});
popupDelete.setEventListeners();
const popupAddCard = new PopupWithForm(".popup_type_add", (inputs, button) => {
  api
    .addNewCard(inputs.name, inputs.link)
    .then((res) => {
      console.log(res);
      cardSection.prependElement(createNewCard(res, res.owner._id));
      console.log(cardSection);

      // cardSection.renderItems();
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`err+ ${err}`);
    });
});
popupAddCard.setEventListeners();
const popupEditInfo = new PopupWithForm(
  ".popup_type_edit",
  (inputs, button) => {
    api
      .changeInfoProfile(inputs.name, inputs.job)
      .then((res) => {
        userInfo.setUserInfo(res);
        popupEditInfo.close();
      })
      .catch((err) => {
        console.log(`err+ ${err}`);
      });
    // .finally(() => renderLoadingForButton(false, popupEdit));
  }
);
popupEditInfo.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  ".popup_type_change-avatar",
  (inputs, button) => {
    api
      .changeAvatar(inputs.link)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`err+ ${err}`);
      });
    // .finally(() => renderLoadingForButton(false, popupEdit));
  }
);
popupEditAvatar.setEventListeners();

api
  .renderUserAndCards()
  .then(([user, data]) => {
    userInfo.setUserInfo(user);
    cardSection = new Section(
      {
        items: data,
        renderer: (item) => {
          cardSection.appendElement(createNewCard(item, user._id));
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
// popupEdit.addEventListener("submit", () =>
// handleProfileFormSubmit(onChangeInfoProfile);
// );
// popupChangeAvatar.addEventListener("submit", () =>
//   handleChangeAvatarFormSubmit(onChangeAvatar)
// );
// События при нажатии кнопок
buttonEdit.addEventListener("click", function () {
  // openPropfilePopup();
  // openPopup(popupEdit);
  popupEditInfo.open();
  editForm.enableValidation();
});
buttonAdd.addEventListener("click", function () {
  popupAddCard.open();
  addForm.enableValidation();
});
buttonChangeAvatar.addEventListener("click", function () {
  popupEditAvatar.open();
  // openPopup(popupChangeAvatar);
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
