export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //связывает item с элементом и добавляется элемент в конец
  appendElement(element, item) {
    item.element = element; //ссылка на элемент
    this._container.append(element);
  }
  //связывает item с элементом и добавляется элемент в начало
  prependElement(element, item) {
    item.element = element; //ссылка на элемент
    this._container.prepend(element);
  }
  prependItem(item) {
    this._items.splice(0, 0, item); //добавление item в начало массива
  }
  //удаление представления карточки
  deleteElement(element) {
    element.remove();
    element = null;
  }
  //удаление данных о карточке и ее представления
  deleteItem(itemId) {
    this._items.forEach((item, index) => {
      if (item._id === itemId) {
        this.deleteElement(item.element); //удаление представления (используяю ссылку на элемент)
        this._items.splice(index, 1); //удаление item из массива
      }
    });
  }
  clear() {
    this._container.innerHTML = "";
  }
  renderItems() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }
}
