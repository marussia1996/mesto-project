const Profile = document.querySelector(".profile");
const EditButton = Profile.querySelector(".profile__edit-button");
const AddButton = Profile.querySelector(".profile__add-button");
const ProfileName = Profile.querySelector(".profile__name");
const ProfileJob = Profile.querySelector(".profile__job");

const PopupEdit = document.querySelector(".popup_edit");
const FormEdit = PopupEdit.querySelector(".form_edit");
const FormName = FormEdit.querySelector(".form__item_info_name");
const FormJob = FormEdit.querySelector(".form__item_info_job");

const PopupAdd = document.querySelector(".popup_add");
const FormAdd = PopupAdd.querySelector(".form_add");
const FormMesto = FormAdd.querySelector(".form__item_info_mesto");
const FormLink = FormAdd.querySelector(".form__item_info_link");

const ClosePopupEditButton = PopupEdit.querySelector(".popup__toggle");
const ClosePopupAddButton = PopupAdd.querySelector(".popup__toggle");
const Elements = document.querySelector(".elements");
const Element = Elements.querySelectorAll(".element");
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
function addElem(link, name) {
  const elemTemplate = document.querySelector("#elem-template").content;
  const element = elemTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__text").textContent = name;
  element.querySelector(".element__image").src = link;
  element.querySelector(".element__image").alt = name;
  Elements.prepend(element);
}
const deleteButton = Elements.querySelectorAll(".element__delete ");
for (let i = 0; i < Element.length; i++) {
  Element[i].querySelector(".element__image").src = initialCards[i].link;
  Element[i].querySelector(".element__text").textContent = initialCards[i].name;
}
Elements.addEventListener("click", function (e) {
  if (e.target.classList.contains("element__like")) {
    // если клик по like
    e.target.classList.toggle("element__like_active");
  } // если есть модификатор _active уберем его, иначе добавим
});
Elements.addEventListener("click", function (e) {
  if (e.target.classList.contains("element__delete")) {
    console.log("нажали на кнопку");
    e.target.parentNode.remove();
  }
});

// Функции открытия/закрытия попап
function OpenPopupEdit() {
  PopupEdit.classList.add("popup_opened");
  // для полей при открытии формы редактирования информации о пользователе
  FormName.value = ProfileName.textContent;
  FormJob.value = ProfileJob.textContent;
}
function OpenPopupAdd() {
  PopupAdd.classList.add("popup_opened");
}
function ClosePopup() {
  PopupEdit.classList.remove("popup_opened");
  PopupAdd.classList.remove("popup_opened");
}

//Функция отправки формы
function formSubmitHandlerEdit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  let nameInput = FormName.value;
  let jobInput = FormJob.value;
  // Выберите элементы, куда должны быть вставлены значения полей && Вставьте новые значения с помощью textContent
  ProfileName.textContent = nameInput;
  ProfileJob.textContent = jobInput;
  ClosePopup();
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  let mestoInput = FormMesto.value;
  let linkInput = FormLink.value;
  addElem(linkInput, mestoInput);
  ClosePopup();
  FormMesto.value = "";
  FormLink.value = "";
}
// События при нажатии кнопок
EditButton.addEventListener("click", OpenPopupEdit);
AddButton.addEventListener("click", OpenPopupAdd);
ClosePopupEditButton.addEventListener("click", ClosePopup);
ClosePopupAddButton.addEventListener("click", ClosePopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
FormEdit.addEventListener("submit", formSubmitHandlerEdit);
FormAdd.addEventListener("submit", formSubmitHandlerAdd);
