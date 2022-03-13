const Profile = document.querySelector(".profile");
const EditButton = Profile.querySelector(".profile__edit-button");
const AddButton = Profile.querySelector(".profile__add-button");
const ProfileName = Profile.querySelector(".profile__name");
const ProfileJob = Profile.querySelector(".profile__job");

const PopupRedact = document.querySelector(".popup_redact");
const FormRedact = PopupRedact.querySelector('.form_redact');
const FormName = FormRedact.querySelector(".form__item_info_name");
const FormJob = FormRedact.querySelector(".form__item_info_job");

const PopupAdd = document.querySelector(".popup_add");
const FormAdd = PopupAdd.querySelector('.form_add');
const FormMesto = FormAdd.querySelector(".form__item_info_mesto");
const FormLink = FormAdd.querySelector(".form__item_info_link");

const ClosePopupRedactButton = PopupRedact.querySelector(".popup__toggle");
const ClosePopupAddButton = PopupAdd.querySelector(".popup__toggle");
const Elements = document.querySelector(".elements");
const Element = Elements.querySelectorAll('.element');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];
for(let i = 0; i<Element.length;i++){
  Element[i].querySelector('.element__image').src = initialCards[i].link;
  Element[i].querySelector('.element__text').textContent = initialCards[i].name;
}

Elements.addEventListener('click', function(e) {
  if (e.target.classList.contains('element__like'))
  {// если клик по like
    e.target.classList.toggle('element__like_active');
  } // если есть модификатор _active уберем его, иначе добавим
});

// Функции открытия/закрытия попап
function OpenPopupRedact(){
  PopupRedact.classList.add('popup_opened');
  // для полей при открытии формы редактирования информации о пользователе
  FormName.value = ProfileName.textContent;
  FormJob.value = ProfileJob.textContent;
}
function OpenPopupAdd(){
  PopupAdd.classList.add('popup_opened');
}
function ClosePopup(){
  PopupRedact.classList.remove('popup_opened');
  PopupAdd.classList.remove('popup_opened');
}
//Функция отправки формы
function formSubmitHandlerRedact (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  let nameInput = FormName.value;
  let jobInput = FormJob.value;
  // Выберите элементы, куда должны быть вставлены значения полей && Вставьте новые значения с помощью textContent
  ProfileName.textContent = nameInput;
  ProfileJob.textContent = jobInput;
  ClosePopup();
}
// События при нажатии кнопок
EditButton.addEventListener('click', OpenPopupRedact);
AddButton.addEventListener('click', OpenPopupAdd);
ClosePopupRedactButton.addEventListener('click', ClosePopup);
ClosePopupAddButton.addEventListener('click', ClosePopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
FormRedact.addEventListener('submit', formSubmitHandlerRedact);
//FormAdd.addEventListener('submit', formSubmitHandlerAdd);

