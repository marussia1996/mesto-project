import { handleCardClick, createPopup, openPopup } from "./modal.js";
import { elements, elemTemplate } from "./constants.js";
import { handleDeleteElement } from "./utils.js";
//Функция получения шаблона карточки
const getTemplate = (template) => {
  return template.querySelector(".element").cloneNode(true);
};
//Создание карточки
function createCard(cardData, profileId, onLikeClick, onCardDelete) {
  const element = getTemplate(elemTemplate);
  updateCardLikeIcon(element, cardData, profileId);
  //Событие на кнопку лайка
  element
    .querySelector(".element__like")
    .addEventListener("click", function () {
      onLikeClick(element, this, cardData, profileId);
    });
  //Событие на кнопку удаления
  if (cardData.owner._id === profileId) {
    element
      .querySelector(".element__delete")
      .addEventListener("click", function () {
        const popupDelete = createPopup(this, cardData._id, onCardDelete);
        document.querySelector(".page").append(popupDelete);
        openPopup(popupDelete, true);
      });
  } else {
    handleDeleteElement(element.querySelector(".element__delete"));
  }
  element.querySelector(".element__text").textContent = cardData.name;
  element.querySelector(".element__image").src = cardData.link;
  element.querySelector(".element__image").alt = cardData.name;
  //Событие при нажатии на картинку
  element
    .querySelector(".element__image")
    .addEventListener("click", () =>
      handleCardClick(cardData.name, cardData.link)
    );
  return element;
}
//Функция проверки лайка
export function isLikedByMe(cardData, profileId) {
  return cardData.likes.some((like) => {
    if (like._id === profileId) {
      return true;
    }
  });
}
export function updateCardLikeIcon(card, cardData, profileId) {
  if (isLikedByMe(cardData, profileId)) {
    card.querySelector(".element__like").classList.add("element__like_active");
  } else {
    card
      .querySelector(".element__like")
      .classList.remove("element__like_active");
  }
  //Определение количества лайков у карточки
  card.querySelector(".element__counter-likes").textContent =
    cardData.likes.length;
}
export { createCard, elements };
