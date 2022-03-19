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
//Переменные для работы с элементами
const elements = document.querySelector(".elements");
//Массив исходных элементов
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
//Функция передачи параметров для попапа с картинкой
function handleCardClick(name, link) {
  openPopup(popupImg);
  image.src = link;
  image.alt = name;
  signature.textContent = name;
}
//Создание карточки
const elemTemplate = document.querySelector("#elem-template").content;
function createCard(link, name) {
  const element = elemTemplate.querySelector(".element").cloneNode(true);
  //Событие на кнопку лайка
  element
    .querySelector(".element__like")
    .addEventListener("click", function () {
      this.classList.toggle("element__like_active");
    });
  //Событие на кнопку удаления
  element
    .querySelector(".element__delete")
    .addEventListener("click", function () {
      this.closest(".element").remove();
    });
  element.querySelector(".element__text").textContent = name;
  element.querySelector(".element__image").src = link;
  element.querySelector(".element__image").alt = name;
  //Событие при нажатии на картинку
  element
    .querySelector(".element__image")
    .addEventListener("click", () => handleCardClick(name, link));
  return element;
}
//Добавление карточки
function addCard(link, name) {
  elements.prepend(createCard(link, name));
}
//Заполнение страницы 6 карточками
for (let i = 5; i >= 0; i--) {
  addCard(initialCards[i].link, initialCards[i].name);
}
// Функция для полей при открытии формы редактирования информации о пользователе
function openPropfilePopup() {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}
// Функции открытия/закрытия попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
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
//Функции отправки формы
function formSubmitHandlerEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  const nameInput = formName.value;
  const jobInput = formJob.value;
  // Выберите элементы, куда должны быть вставлены значения полей && Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  closePopup(popupEdit);
}
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  const mestoInput = formMesto.value;
  const linkInput = formLink.value;
  addCard(linkInput, mestoInput);
  closePopup(popupAdd);
  formAdd.reset();
}
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", formSubmitHandlerEdit);
formAdd.addEventListener("submit", formSubmitHandlerAdd);
