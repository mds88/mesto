import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._popupImagePic = this._popupElement.querySelector('.popup__image');
        this._popupImageText = this._popupElement.querySelector('.popup__text');
    }

    open(dataCard) {
        this._popupImagePic.src = dataCard.srcPic;
        this._popupImagePic.alt = dataCard.altPic;
        this._popupImageText.textContent = dataCard.namePic;

        super.open();
    }
}