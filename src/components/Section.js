export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items.reverse();
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  _clear() {
    this._container.innerHTML = "";
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  renderItems() {
    this._clear();
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
}
