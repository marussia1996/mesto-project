import "../pages/index.css";
import Card from "../components/Card.js";
import {
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  validateSelectors,
  userInfoSelectors,
  apiConfig,
} from "../components/utils/constants.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
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
      rejectLike: () => {
        api
          .rejectLike(item._id)
          .then((item) => {
            card.setLikes(item.likes);
            card.updateCardLikeIcon();
          })
          .catch((err) => console.log(`Ошибка при снятии лайка: ${err}`));
      },
      setLike: () => {
        api
          .setLike(item._id)
          .then((item) => {
            card.setLikes(item.likes);
            card.updateCardLikeIcon();
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
const api = new Api({ apiConfig: apiConfig });
let cardSection;
// Объект userInfo
const userInfo = new UserInfo({ selectors: userInfoSelectors });

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();
const popupDelete = new PopupWithConfirm(".popup_type_delete", {
  callbackSubmit: (idCard) => {
    api
      .deleteCard(idCard)
      .then((res) => {
        popupDelete.close();
        cardSection.deleteItem(idCard);
      })
      .catch((err) => console.log(`Ошибка при удалении: ${err}`));
  },
});
popupDelete.setEventListeners();
const popupAddCard = new PopupWithForm(".popup_type_add", (inputs) => {
  popupAddCard.renderLoading(true);
  api
    .addNewCard(inputs.name, inputs.link)
    .then((res) => {
      cardSection.prependItem(res);
      cardSection.prependElement(createNewCard(res, res.owner._id), res);
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`err+ ${err}`);
    })
    .finally(() => popupAddCard.renderLoading(false));
});
popupAddCard.setEventListeners();
const popupEditInfo = new PopupWithForm(".popup_type_edit", (inputs) => {
  popupEditInfo.renderLoading(true);
  api
    .changeInfoProfile(inputs.name, inputs.about)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        about: res.about,
        avatar: res.avatar,
        _id: res._id,
      });
      popupEditInfo.close();
    })
    .catch((err) => {
      console.log(`err+ ${err}`);
    })
    .finally(() => popupEditInfo.renderLoading(false));
});
popupEditInfo.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  ".popup_type_change-avatar",
  (inputs) => {
    popupEditAvatar.renderLoading(true);
    api
      .changeAvatar(inputs.link)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          _id: res._id,
        });
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`err+ ${err}`);
      })
      .finally(() => popupEditAvatar.renderLoading(false));
  }
);
popupEditAvatar.setEventListeners();

api
  .renderUserAndCards()
  .then(([user, data]) => {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    });
    cardSection = new Section(
      {
        items: data,
        renderer: (item) => {
          cardSection.appendElement(createNewCard(item, user._id), item);
        },
      },
      ".elements"
    );
    cardSection.renderItems();
  })
  .catch((err) => console.log(err));

//Валидация
const formValidators = {};

// Включение валидации
const enableValidation = ({ selectors }) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator({ selectors: selectors }, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation({ selectors: validateSelectors });

// События при нажатии кнопок
buttonEdit.addEventListener("click", function () {
  popupEditInfo.setInputValues(userInfo.getUserInfo());
  popupEditInfo.open();
  formValidators["edit-profile"].resetValidation();
});
buttonAdd.addEventListener("click", function () {
  popupAddCard.open();
  formValidators["add-mesto"].resetValidation();
});
buttonChangeAvatar.addEventListener("click", function () {
  popupEditAvatar.open();
  formValidators["change-avatar"].resetValidation();
});
