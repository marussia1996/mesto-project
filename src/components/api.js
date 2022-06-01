const apiConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-10",
  headers: {
    Authorization: "faedd00d-3d28-4943-bdc6-39d59e46ebad",
    "Content-Type": "application/json",
  },
};
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
};
export const getInfoProfileFromServer = () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    headers: apiConfig.headers,
  }).then(getResponse);
};
export const getListCards = () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    headers: apiConfig.headers,
  }).then(getResponse);
};
export const changeInfoProfile = (nameInput, jobInput) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  }).then(getResponse);
};
export const addNewCard = (nameCard, linkCard) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then(getResponse);
};
export const deleteCard = (cardElement, idCard) => {
  return fetch(`${apiConfig.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getResponse);
};
export const setLike = (idCard) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
    method: "PUT",
    headers: apiConfig.headers,
  }).then(getResponse);
};
export const rejectLike = (idCard) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${idCard}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  }).then(getResponse);
};
