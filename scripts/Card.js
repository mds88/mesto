import {openPopup} from '../scripts/index.js';

// Класс создания карточки места
export class Card {
    constructor(data, templateSelector) {
        this._namePic = data.namePic;
        this._srcPic = data.srcPic;
        this._altPic = data.altPic;
        this._templateSelector = templateSelector;
        
    }

    createCard() {
        this._element = this._getTemplate();
        
        this._popupImageText.textContent = this._namePic;
        this._popupImagePic.src = this._srcPic;
        this._popupImagePic.alt = this._altPic;

        this._setEventListeners();

        return this._element;
    }

    _getTemplate() {
        const cardElement = this._templateSelector.content.cloneNode(true);
        this._popupImageText = cardElement.querySelector('.element__title');
        this._popupImagePic = cardElement.querySelector('.element__image');

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        })

        this._element.querySelector('.element__del').addEventListener('click', (evt) => {
            this._handleDelClick(evt);
        })

        this._element.querySelector('.element__image').addEventListener('click', (evt) => {
            this._handleImageClick(evt);
        })
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _handleDelClick(evt) {
        const delItem = evt.target.closest('.element');
        delItem.remove();
    }

    _handleImageClick(evt) {
        const popupImage = document.querySelector('.popup_image');
        const popupImagePic = popupImage.querySelector('.popup__image');
        const popupImageText = popupImage.querySelector('.popup__text');

        popupImagePic.src = this._srcPic;
        popupImagePic.alt = this._altPic;
        popupImageText.textContent = this._namePic;

        openPopup(popupImage);
    }
}