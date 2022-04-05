export class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(itemsArray) {
        itemsArray.forEach(element => {
            this._renderer(element);
        });
    }

    addItem(cardElement) {
        this._container.prepend(cardElement);
    }
}