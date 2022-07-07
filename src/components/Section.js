export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  appendElement(element) {
    this._container.append(element);
  }
  prependElement(element) {
    this._container.prepend(element);
  }
  clear() {
    this._container.innerHTML = "";
  }
  renderItems() {
    this.clear();
    console.log(this._items);
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
  // renderCards = (cardsObject) => {
  //   cardsObject.cards.forEach((item) => {
  //     const objItem = {
  //       card: item,
  //       userId: cardsObject.userId,
  //       insertMethod: cardsObject.insertMethod,
  //     };
  //     this._renderer(objItem);
  //   });
  // };

  // addItem = (element, insertMethod) => {
  //   // отображаем рендер как следует, а новую карточку добавляем в начало
  //   if (insertMethod == "append") {
  //     this._container.append(element);
  //   } else {
  //     this._container.prepend(element);
  //   }
  // };
}
