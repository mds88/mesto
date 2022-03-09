import {openPopup, popupImage, popupImageText, popupImagePic} from '../scripts/index.js';

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
        
        this._elementText.textContent = this._namePic;
        this._elementPic.src = this._srcPic;
        this._elementPic.alt = this._altPic;

        this._setEventListeners();

        return this._element;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .children[0]
        .cloneNode(true);

        this._elementText = cardElement.querySelector('.element__title');
        this._elementPic = cardElement.querySelector('.element__image');

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        })

        this._element.querySelector('.element__del').addEventListener('click', () => {
            this._handleDelClick(this._element);
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _handleDelClick() {
        this._element.remove();
    }

    _handleImageClick() {
        popupImagePic.src = this._srcPic;
        popupImagePic.alt = this._altPic;
        popupImageText.textContent = this._namePic;

        openPopup(popupImage);
    }
}