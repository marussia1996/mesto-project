import { getCardElement, elements } from "./card.js";
import { profileName, profileJob, profileAvatar } from "./utils/constants.js";
//Добавление карточки
export function addCard(
  cardData,
  profileId,
  onLikeClick,
  onCardDelete,
  onDeleteClick
) {
  elements.prepend(
    getCardElement(
      cardData,
      profileId,
      onLikeClick,
      onCardDelete,
      onDeleteClick
    )
  );
}
//Функция для показа пользователю, что данные грузятся
export function renderLoadingForButton(isLoading, button) {
  if (isLoading) {
    if (button.textContent.replace(/\s+/g, "") === "Сохранить") {
      button.textContent = "Сохранение...";
    } else {
      button.textContent = "Создание...";
    }
  } else {
    if (button.textContent.replace(/\s+/g, "") === "Сохранение...") {
      button.textContent = "Сохранить";
    } else {
      button.textContent = "Создать";
    }
  }
}
// функция заполнения данных профиля
export const setProfileInfoOnPage = (profileData) => {
  profileName.textContent = profileData.profileName;
  profileJob.textContent = profileData.profileJob;
  profileAvatar.style.backgroundImage = `url(${profileData.profileAvatar})`;
};
