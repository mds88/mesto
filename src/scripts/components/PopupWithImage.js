import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, dataCard) {
        super(popupSelector);
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(popupSelector);
        this._popupImagePic = this._popupElement.querySelector('.popup__image');
        this._popupImageText = this._popupElement.querySelector('.popup__text');
        this._dataCard = dataCard;
    }

    open() {
        this._popupImagePic.src = this._dataCard.srcPic;
        this._popupImagePic.alt = this._dataCard.altPic;
        this._popupImageText.textContent = this._dataCard.namePic;

        super.setEventListeners();
        super.open();
    }
}