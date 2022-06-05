import { openPopup } from "./modal.js";
import { popupDelete, elements, image, signature } from "./utils/constants.js";
//Функция получения шаблона карточки
const getTemplate = () => {
  return document
    .querySelector("#elem-template")
    .content.querySelector(".element")
    .cloneNode(true);
};
//Удаление элемента
export const handleDeleteElement = (element) => {
  element.remove();
  element = null;
};
//Функция передачи параметров для попапа с картинкой
function handleCardClick(name, link) {
  openPopup(popupImg);
  image.src = link;
  image.alt = name;
  signature.textContent = name;
}
//Получение элемента карточки
function getCardElement(
  cardData,
  profileId,
  onLikeClick,
  onCardDelete,
  onDeleteClick
) {
  const element = getTemplate();
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
        onDeleteClick(popupDelete, cardData._id, element, onCardDelete);
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
export { getCardElement, elements };
