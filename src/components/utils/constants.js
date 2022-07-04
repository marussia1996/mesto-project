//Переменные для работы с элементами
export const elements = document.querySelector(".elements");
//Массив всех форм
export const popups = Array.from(document.querySelectorAll(".popup"));
//Переменные для работы с профилем
export const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileJob = profile.querySelector(".profile__job");
export const profileAvatar = profile.querySelector(".profile__avatar");
//Переменные для работы с формой редактирований
export const popupEdit = document.querySelector(".popup_type_edit");
export const formEdit = popupEdit.querySelector(".form_type_edit");
export const formName = formEdit.querySelector(".form__item_info_name");
export const formJob = formEdit.querySelector(".form__item_info_job");
//Переменные для работы с формой добавления
export const popupAdd = document.querySelector(".popup_type_add");
export const formAdd = popupAdd.querySelector(".form_type_add");
export const formMesto = formAdd.querySelector(".form__item_info_mesto");
export const formLink = formAdd.querySelector(".form__item_info_link");
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
//Переменные для работы с формой просмотра
export const popupImg = document.querySelector(".popup_type_image");
export const image = popupImg.querySelector(".popup__image");
export const signature = popupImg.querySelector(".popup__signature");
//Кнопки для открытия попапов
export const buttonEdit = profile.querySelector(".profile__edit-button");
export const buttonAdd = profile.querySelector(".profile__add-button");
export const buttonChangeAvatar = profile.querySelector(
  ".profile__button-avatar-change"
);
//Переменные для работы с формой удаления карточки
export const popupDelete = document.querySelector(".popup_type_delete");
//Переменные для кнопок закрытия форм
export const buttonClosePopupEdit = popupEdit.querySelector(".popup__toggle");
export const buttonClosePopupAdd = popupAdd.querySelector(".popup__toggle");
export const buttonClosePopupImg = popupImg.querySelector(".popup__toggle");
export const buttonClosePopupChange =
  popupChangeAvatar.querySelector(".popup__toggle");
export const buttonClosePopupDelete =
  popupDelete.querySelector(".popup__toggle");
//Переменные для селекторов необходимых при валидации
export const formsSelector = ".form";
export const formEditClass = "form_type_edit";
export const inputSelector = ".form__item";
export const submitButtonSelector = ".form__button";
export const inactiveButtonClass = "form__button_inactive";
export const inputErrorClass = "form__item_type_error";
export const errorClass = "form__item-error_active";
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
