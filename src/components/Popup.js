export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
  }
  // Функции открытия/закрытия попап
  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      this._closePopupByEsc(evt);
    });
  }
  closePopup() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (evt) => {
      this._closePopupByEsc(evt);
    });
  }
  //Функция обработки нажатия на ESC
  _closePopupByEsc(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.closePopup();
      }
    });
    this._popup
      .querySelector(".popup__toggle")
      .addEventListener("click", () => {
        this.closePopup();
      });

    //мне ревьюер посоветовал так сделать закрытие на крестик и оверлэй
    //проверить бы
    // this._popup.addEventListener("mousedown", (evt) => {
    //   if (evt.target.classList.contains("popup")) {
    //     this.closePopup();
    //   }
    //   if (evt.target.classList.contains("popup__toggle")) {
    //     this.closePopup();
    //   }
    // });
  }
}
