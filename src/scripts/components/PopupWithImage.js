import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImagePic = this._popup.querySelector('.popup__image');
        this._popupImageText = this._popup.querySelector('.popup__text');
    }

    open(dataCard) {
        this._popupImagePic.src = dataCard.link;
        this._popupImagePic.alt = 'Фото ' + dataCard.name;
        this._popupImageText.textContent = dataCard.name;

        super.open();
    }
}