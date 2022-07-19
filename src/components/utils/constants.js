//Переменные для работы с профилем
export const profile = document.querySelector(".profile");
//Переменные для работы с формой редактирований
export const popupEdit = document.querySelector(".popup_type_edit");
export const formEdit = popupEdit.querySelector(".form_type_edit");
export const formName = formEdit.querySelector(".form__item_info_name");
export const formJob = formEdit.querySelector(".form__item_info_job");
//Переменные для работы с формой добавления
export const popupAdd = document.querySelector(".popup_type_add");
export const formAdd = popupAdd.querySelector(".form_type_add");
//Переменные для работы с формой редактирования аватара пользователя
export const popupChangeAvatar = document.querySelector(
  ".popup_type_change-avatar"
);
export const formChangeAvatar = popupChangeAvatar.querySelector(
  ".form_type_change-avatar"
);
export const linkChangeAvatar = formChangeAvatar.querySelector(
  ".form__item_profile_change"
);
//Кнопки для открытия попапов
export const buttonEdit = profile.querySelector(".profile__edit-button");
export const buttonAdd = profile.querySelector(".profile__add-button");
export const buttonChangeAvatar = profile.querySelector(
  ".profile__button-avatar-change"
);
export const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    Authorization: "faedd00d-3d28-4943-bdc6-39d59e46ebad",
    "Content-Type": "application/json",
  },
};
export const userInfoSelectors = {
  nameSelector: ".profile__name",
  aboutSelector: ".profile__job",
  avatarSelector: ".profile__avatar",
};
export const validateSelectors = {
  formSelector: ".form",
  formEditClass: "form_type_edit",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};
