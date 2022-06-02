import {
  openPopup,
  closePopup,
  addCard,
  renderLoadingForButton,
} from "./utils.js";
import { toggleButtonState } from "./validate.js";
import {
  changeInfoProfile,
  addNewCard,
  deleteCard,
  changeAvatar,
} from "./api.js";
//Переменные для работы с профилем
export const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileJob = profile.querySelector(".profile__job");
export const profileAvatar = profile.querySelector(".profile__avatar");
//Переменные для работы с формой редактирований
export const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = popupEdit.querySelector(".form_type_edit");
const formName = formEdit.querySelector(".form__item_info_name");
const formJob = formEdit.querySelector(".form__item_info_job");
//Переменные для работы с формой добавления
export const popupAdd = document.querySelector(".popup_type_add");
const formAdd = popupAdd.querySelector(".form_type_add");
const formMesto = formAdd.querySelector(".form__item_info_mesto");
const formLink = formAdd.querySelector(".form__item_info_link");
//Переменные для работы с формой редактирования аватара пользователя
export const popupChangeAvatar = document.querySelector(
  ".popup_type_change-avatar"
);
const formChangeAvatar = popupChangeAvatar.querySelector(
  ".form_type_change-avatar"
);
const linkChangeAvatar = formChangeAvatar.querySelector(
  ".form__item_profile_change"
);
//Переменные для работы с формой просмотра
export const popupImg = document.querySelector(".popup_type_image");
const image = popupImg.querySelector(".popup__image");
const signature = popupImg.querySelector(".popup__signature");
//Функция передачи параметров для попапа с картинкой
export function handleCardClick(name, link) {
  openPopup(popupImg);
  image.src = link;
  image.alt = name;
  signature.textContent = name;
}
// Функция для полей при открытии формы редактирования информации о пользователе
export function openPropfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}
//Функция создания попапа удаления для карточки
const popupDelTemplate = document.querySelector("#popupDel-template").content;
export function createPopup(cardElement, idCard) {
  const popupTemplate = popupDelTemplate.querySelector(".popup");
  const popup = popupTemplate.cloneNode(true);
  popup.querySelector(".popup__button").addEventListener("click", function () {
    deleteCard(cardElement, idCard)
      .then((res) => {
        closePopup(popup);
        cardElement.closest(".element").remove();
        setTimeout(deletePopup, 1000);
      })
      .catch((err) => console.log(`Ошибка при удалении: ${err}`));
  });
  popup.querySelector(".popup__toggle").addEventListener("click", function () {
    closePopup(popup);
    setTimeout(deletePopup, 1000);
  });
  popup.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
      setTimeout(deletePopup, 1000);
    }
  });
  return popup;
}
//функция удаления попапа
export function deletePopup() {
  document.querySelector(".popup_type_delete").remove();
}
//Функции отправки формы
export function handleProfileFormSubmit() {
  // Получите значение полей jobInput и nameInput из свойства value
  const nameInput = formName.value;
  const jobInput = formJob.value;
  // Выберите элементы, куда должны быть вставлены значения полей && Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  renderLoadingForButton(true, popupEdit.querySelector(".form__button"));
  changeInfoProfile(nameInput, jobInput)
    .then(() => closePopup(popupEdit))
    .catch((err) => console.log(`Ошибка при изменении данных: ${err}`))
    .finally(() =>
      renderLoadingForButton(false, popupEdit.querySelector(".form__button"))
    );
}
export function handleAddCardFormSubmit(profileId) {
  const mestoInput = formMesto.value;
  const linkInput = formLink.value;
  const inputList = Array.from(formAdd.querySelectorAll(".form__item"));
  const buttonElement = formAdd.querySelector(".form__button");
  renderLoadingForButton(true, popupAdd.querySelector(".form__button"));
  addNewCard(mestoInput, linkInput)
    .then((card) => addCard(card, profileId))
    .catch((err) => console.log(`Ошибка при добавлении:${err}`))
    .finally(() =>
      renderLoadingForButton(true, popupAdd.querySelector(".form__button"))
    );
  closePopup(popupAdd);
  formAdd.reset();
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: "form__button_inactive",
  });
}
export function handleChangeAvatarFormSubmit() {
  const linkAvatar = linkChangeAvatar.value;
  renderLoadingForButton(
    true,
    popupChangeAvatar.querySelector(".form__button")
  );
  changeAvatar(linkAvatar)
    .then(
      (link) => (profileAvatar.style.backgroundImage = `url(${link.avatar})`)
    )
    .catch((err) => console.log(`Ошибка при изменении аватара:${err}`))
    .finally(() =>
      renderLoadingForButton(
        true,
        popupChangeAvatar.querySelector(".form__button")
      )
    );
  const inputList = Array.from(
    formChangeAvatar.querySelectorAll(".form__item")
  );
  const buttonElement = formChangeAvatar.querySelector(".form__button");
  closePopup(popupChangeAvatar);
  formChangeAvatar.reset();
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: "form__button_inactive",
  });
}
