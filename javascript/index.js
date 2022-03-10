let Profile = document.querySelector(".profile");
let EditButton = Profile.querySelector(".profile__edit-button");
let ProfileName = Profile.querySelector(".profile__name");
let ProfileJob = Profile.querySelector(".profile__job");
let FormRedact = document.querySelector(".popup");
let ClosePopupButton = FormRedact.querySelector(".popup__toggle");
const FormElement = FormRedact.querySelector('.form');
const FormName = FormRedact.querySelector(".form__item_info_name");
const FormJob = FormRedact.querySelector(".form__item_info_job");

// Функции открытия/закрытия попап
function OpenPopup(){
  FormRedact.classList.add('popup_opened');
  // для полей при открытии формы редактирования информации о пользователе
  FormName.value = ProfileName.textContent;
  FormJob.value = ProfileJob.textContent;
}

function ClosePopup(){
  FormRedact.classList.remove('popup_opened');
}
//Функция отправки формы
function formSubmitHandler (evt) {
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
EditButton.addEventListener('click', OpenPopup);
ClosePopupButton.addEventListener('click', ClosePopup);
// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
FormElement.addEventListener('submit', formSubmitHandler);

