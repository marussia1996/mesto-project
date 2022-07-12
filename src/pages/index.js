import "../pages/index.css";
import Card from "../components/Card.js";
import {
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  formAdd,
  formEdit,
  formChangeAvatar,
  validateSelectors,
  userInfoSelectors,
  formName,
  formJob,
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
const api = new Api({ apiConfig: apiConfig });
let cardSection;
// Объект userInfo
const userInfo = new UserInfo({ selectors: userInfoSelectors });

const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();
const popupDelete = new PopupWithConfirm(".popup_type_delete", {
  callbackSubmit: (idCard) => {
    console.log(idCard);
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
    .changeInfoProfile(inputs.name, inputs.job)
    .then((res) => {
      userInfo.setUserInfo(res);
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
        userInfo.setUserAvatar(res.avatar);
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
    userInfo.setUserInfo(user);
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

//Объекты валидации форм
const editForm = new FormValidator({ selectors: validateSelectors }, formEdit);
const addForm = new FormValidator({ selectors: validateSelectors }, formAdd);
const changeForm = new FormValidator(
  { selectors: validateSelectors },
  formChangeAvatar
);

function renderInfoForm() {
  const userData = userInfo.getUserInfo();
  formName.value = userData.name;
  formJob.value = userData.about;
}
// События при нажатии кнопок
buttonEdit.addEventListener("click", function () {
  renderInfoForm();
  popupEditInfo.open();
  editForm.enableValidation();
});
buttonAdd.addEventListener("click", function () {
  popupAddCard.open();
  addForm.enableValidation();
});
buttonChangeAvatar.addEventListener("click", function () {
  popupEditAvatar.open();
  changeForm.enableValidation();
});
