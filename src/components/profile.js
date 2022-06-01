import { getInfoProfileFromServer } from "./api.js";
import { profileName, profileJob } from "./modal.js";
const profileAvatar = document.querySelector(".profile__avatar");
//Получение данных о пользователе
export const getInfoProfile = () => {
  return getInfoProfileFromServer()
    .then((data) => {
      return {
        profileId: data._id,
        profileName: data.name,
        profileJob: data.about,
        profileAvatar: data.avatar,
      };
    })
    .catch((err) => {
      return {
        profileId: "",
        profileName: err,
        profileJob: "",
        profileAvatar: "",
      };
    });
};
// функция заполнения данных профиля
export const setProfileInfoOnPage = (profileData) => {
  profileName.textContent = profileData.profileName;
  profileJob.textContent = profileData.profileJob;
  profileAvatar.src = profileData.profileAvatar;
};
