export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
  }
  // Функции открытия/закрытия попап
  openPopup() {
    document.querySelector(this._selectorPopup).classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      this._closePopupByEsc(evt);
    });
  }
  closePopup() {
    document
      .querySelector(this._selectorPopup)
      .classList.remove("popup_opened");
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
    document
      .querySelector(this._selectorPopup)
      .addEventListener("click", (evt) => {
        if (evt.target.classList.contains("popup")) {
          this.closePopup();
        }
      });
    document
      .querySelector(this._selectorPopup)
      .querySelector(".popup__toggle")
      .addEventListener("click", () => {
        this.closePopup();
      });
  }
}
