// Класс создания карточки места
export default class Card {
    constructor(data, templateSelector, {handleCardClick}) {
        this._namePic = data.namePic;
        this._srcPic = data.srcPic;
        this._altPic = data.altPic;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;  
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
        .querySelector('.element')
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

        this._elementPic.addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('element__like_active');
    }

    _handleDelClick() {
        this._element.remove();
    }
}