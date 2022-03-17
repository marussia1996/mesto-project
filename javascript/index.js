//Переменные для работы с профилем
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-button");
const addButton = profile.querySelector(".profile__add-button");
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
const closePopupEditButton = popupEdit.querySelector(".popup__toggle");
const closePopupAddButton = popupAdd.querySelector(".popup__toggle");
const closePopupImgButton = popupImg.querySelector(".popup__toggle");
//Переменные для работы с элементами
const elements = document.querySelector(".elements");
//Массив истодных элементов
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
//Добавление элемента
function addElem(link, name) {
  const elemTemplate = document.querySelector("#elem-template").content;
  const element = elemTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__text").textContent = name;
  element.querySelector(".element__image").src = link;
  element.querySelector(".element__image").alt = name;
  elements.prepend(element);
}
//Создание элемента
function createElem(link, name) {
  const elemTemplate = document.querySelector("#elem-template").content;
  const element = elemTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__text").textContent = name;
  element.querySelector(".element__image").src = link;
  element.querySelector(".element__image").alt = name;
  elements.append(element);
}
//Заполнение страницы 6 карточками
for (let i = 0; i < 6; i++) {
  createElem(initialCards[i].link, initialCards[i].name);
}
// Функции открытия/закрытия попап
function openPopupEdit() {
  popupEdit.classList.add("popup_opened");
  // для полей при открытии формы редактирования информации о пользователе
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}
function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}
function openPopupImg() {
  popupImg.classList.add("popup_opened");
}
function closePopupEdit() {
  popupEdit.classList.remove("popup_opened");
}
function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}
function closePopupImg() {
  popupImg.classList.remove("popup_opened");
}
//Функции отправки формы
function formSubmitHandlerEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  let nameInput = formName.value;
  let jobInput = formJob.value;
  // Выберите элементы, куда должны быть вставлены значения полей && Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;
  closePopupEdit();
}
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  let mestoInput = formMesto.value;
  let linkInput = formLink.value;
  addElem(linkInput, mestoInput);
  closePopupAdd();
  formMesto.value = "";
  formLink.value = "";
}
// События при нажатии кнопок
editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);
closePopupEditButton.addEventListener("click", closePopupEdit);
closePopupAddButton.addEventListener("click", closePopupAdd);
closePopupImgButton.addEventListener("click", closePopupImg);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", formSubmitHandlerEdit);
formAdd.addEventListener("submit", formSubmitHandlerAdd);
//Функции обработки событий для элементов
elements.addEventListener("click", function (e) {
  if (e.target.classList.contains("element__like")) {
    // если клик по like
    e.target.classList.toggle("element__like_active");
  } // если есть модификатор _active уберем его, иначе добавим
});
elements.addEventListener("click", function (e) {
  if (e.target.classList.contains("element__delete")) {
    e.target.parentNode.remove();
  }
});
elements.addEventListener("click", function (e) {
  if (e.target.classList.contains("element__image")) {
    openPopupImg();
    image.src = e.target.src;
    let parentElem = e.target.parentNode;
    let text = parentElem
      .querySelector(".element__group")
      .querySelector(".element__text");
    signature.textContent = text.textContent;
  }
});
