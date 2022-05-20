import { addCard } from "./card.js";
import { openPopup, closePopup } from "./utils.js";
//Переменные для работы с профилем
const profile = document.querySelector(".profile");
const buttonEdit = profile.querySelector(".profile__edit-button");
const buttonAdd = profile.querySelector(".profile__add-button");
const profileName = profile.querySelector(".profile__name");
const profileJob = profile.querySelector(".profile__job");
//Переменные для работы с формой редактирований
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = popupEdit.querySelector(".form_type_edit");
const formName = formEdit.querySelector(".form__item_info_name");
const formJob = formEdit.querySelector(".form__item_info_job");
//Переменные для работы с формой добавления
const popupAdd = document.querySelector(".popup_type_add");
const formAdd = popupAdd.querySelector(".form_type_add");
const formMesto = formAdd.querySelector(".form__item_info_mesto");
const formLink = formAdd.querySelector(".form__item_info_link");
//Переменные для работы с формой просмотра
const popupImg = document.querySelector(".popup_type_image");
const image = popupImg.querySelector(".popup__image");
const signature = popupImg.querySelector(".popup__signature");
//Переменные для кнопок закрытия форм
const buttonClosePopupEdit = popupEdit.querySelector(".popup__toggle");
const buttonClosePopupAdd = popupAdd.querySelector(".popup__toggle");
const buttonClosePopupImg = popupImg.querySelector(".popup__toggle");
//Функция передачи параметров для попапа с картинкой
export function handleCardClick(name, link) {
  openPopup(popupImg);
  image.src = link;
  image.alt = name;
  signature.textContent = name;
}
// Функция для полей при открытии формы редактирования информации о пользователе
function openPropfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}
// События при нажатии кнопок
buttonEdit.addEventListener("click", function () {
  openPropfilePopup();
  openPopup(popupEdit);
});
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd);
});
buttonClosePopupEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});
buttonClosePopupAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
buttonClosePopupImg.addEventListener("click", function () {
  closePopup(popupImg);
});
//Закрытие попап по ESC
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popupEdit);
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popupAdd);
  }
});
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopup(popupImg);
  }
});
//Закрытие попап по нажатию внешней области
popupEdit.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_type_edit")) {
    closePopup(popupEdit);
  }
});
popupAdd.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_type_add")) {
    closePopup(popupAdd);
  }
});
popupImg.addEventListener("click", function (evt) {
  if (evt.target.classList.contains("popup_type_image")) {
    closePopup(popupImg);
  }
});
//Функции отправки формы
export function formSubmitHandlerEdit() {
  // Получите значение полей jobInput и nameInput из свойства value
  const nameInput = formName.value;
  const jobInput = formJob.value;
  // Выберите элементы, куда должны быть вставлены значения полей && Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  closePopup(popupEdit);
}
export function formSubmitHandlerAdd() {
  const mestoInput = formMesto.value;
  const linkInput = formLink.value;
  addCard(linkInput, mestoInput);
  closePopup(popupAdd);
  formAdd.reset();
}
