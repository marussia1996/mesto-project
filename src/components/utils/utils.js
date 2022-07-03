import { getCardElement, elements } from "../card.js";
import { profileName, profileJob, profileAvatar } from "../utils/constants.js";
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
export function renderLoadingForButton(isLoading, popup) {
  const currentActiveButton = popup.querySelector(".form__button");
  if (isLoading) {
    currentActiveButton.textContent = "Сохранение...";
  } else {
    currentActiveButton.textContent = "Сохранить";
  }
}
// функция заполнения данных профиля
export const setProfileInfoOnPage = (profileData) => {
  profileName.textContent = profileData.profileName;
  profileJob.textContent = profileData.profileJob;
  profileAvatar.style.backgroundImage = `url(${profileData.profileAvatar})`;
};
