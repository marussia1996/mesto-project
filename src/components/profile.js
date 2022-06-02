import { getInfoProfileFromServer } from "./api.js";
import { profileName, profileJob, profileAvatar } from "./modal.js";
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
      console.log(`Не удалось получить данные пользователя: ${err}`);
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
  profileAvatar.style.backgroundImage = `url(${profileData.profileAvatar})`;
};
