const Profile = document.querySelector(".profile");
const EditButton = Profile.querySelector(".profile__edit-button");
const ProfileName = Profile.querySelector(".profile__name");
const ProfileJob = Profile.querySelector(".profile__job");
const FormRedact = document.querySelector(".popup");
const ClosePopupButton = FormRedact.querySelector(".popup__toggle");
const FormElement = FormRedact.querySelector('.form');
const FormName = FormRedact.querySelector(".form__item_info_name");
const FormJob = FormRedact.querySelector(".form__item_info_job");
const Elements = document.querySelector(".elements");

Elements.addEventListener('click', function(e) {
  if (e.target.classList.contains('element__like'))
  {// если клик по like
    e.target.classList.toggle('element__like_active');
  } // если есть модификатор _active уберем его, иначе добавим
});

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

