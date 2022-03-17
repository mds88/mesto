export class Section {
    constructor({items, renderer}, containerSelector) {
        this._itemsArray = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._itemsArray.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(cardElement) {
        this._container.prepend(cardElement);
    }
}