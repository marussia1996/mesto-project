import { handleCardClick, createPopup } from "./modal.js";
import { openPopup } from "./utils.js";
import { setLike, rejectLike } from "./api.js";
//Переменные для работы с элементами
const elements = document.querySelector(".elements");
//Создание карточки
const elemTemplate = document.querySelector("#elem-template").content;
function createCard(cardData, profileId) {
  const element = elemTemplate.querySelector(".element").cloneNode(true);
  //Определение является ли картинка лайкнутой нами ранее
  if (isLikedByMe(cardData, profileId)) {
    element
      .querySelector(".element__like")
      .classList.add("element__like_active");
  } else {
    element
      .querySelector(".element__like")
      .classList.remove("element__like_active");
  }
  //Событие на кнопку лайка
  element
    .querySelector(".element__like")
    .addEventListener("click", function () {
      if (this.classList.contains("element__like_active")) {
        rejectLike(cardData._id)
          .then((card) => {
            this.classList.remove("element__like_active");
            cardData.likes.length = card.likes.length;
            element.querySelector(".element__counter-likes").textContent =
              cardData.likes.length;
          })
          .catch((err) => console.log(`Ошибка при снятии лайка: ${err}`));
      } else {
        setLike(cardData._id)
          .then((card) => {
            this.classList.add("element__like_active");
            cardData.likes.length = card.likes.length;
            element.querySelector(".element__counter-likes").textContent =
              cardData.likes.length;
          })
          .catch((err) => console.log(`Ошибка при установке лайка: ${err}`));
      }
    });
  //Событие на кнопку удаления
  if (cardData.owner._id === profileId) {
    element
      .querySelector(".element__delete")
      .addEventListener("click", function () {
        const popupDelete = createPopup(this, cardData._id);
        document.querySelector(".page").append(popupDelete);
        setTimeout(openPopup, 100, popupDelete);
      });
  } else {
    element.querySelector(".element__delete").remove();
  }
  element.querySelector(".element__text").textContent = cardData.name;
  element.querySelector(".element__image").src = cardData.link;
  element.querySelector(".element__image").alt = cardData.name;
  element.querySelector(".element__counter-likes").textContent =
    cardData.likes.length;
  //Событие при нажатии на картинку
  element
    .querySelector(".element__image")
    .addEventListener("click", () =>
      handleCardClick(cardData.name, cardData.link)
    );
  return element;
}
//Функция проверки лайка
function isLikedByMe(cardData, profileId) {
  return cardData.likes.some((like) => {
    if (like._id === profileId) {
      return true;
    }
  });
}
export { createCard, elements };
