import { handleCardClick } from "./modal.js";
//Переменные для работы с элементами
const elements = document.querySelector(".elements");
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

export { createCard, elements };
