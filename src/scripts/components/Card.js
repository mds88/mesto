// Класс создания карточки места
export default class Card {
    constructor(data, templateSelector, {handleCardClick, handleDelClick, handleLikeClick}, userId) {
        this._namePic = data.name;
        this._srcPic = data.link;
        this._altPic = 'Фото ' + data.name;
        this._likes = data.likes;
        this._id = data.owner._id;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick; 
        this._handleDelClick = handleDelClick;
        this._handleLikeClick = handleLikeClick;
    }

    createCard() {
        this._element = this._getTemplate();
        
        this._elementText.textContent = this._namePic;
        this._elementPic.src = this._srcPic;
        this._elementPic.alt = this._altPic;
        this._elementLikesCount.textContent = this._likes.length;

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
        this._elementLikesCount = cardElement.querySelector('.element__like-count');
        this._elementDel = cardElement.querySelector('.element__del');
        this._elementLike = cardElement.querySelector('.element__like');

        if (this._id === this._userId) {
            this._elementDel.classList.add('element__del_visible');
        }
        
        const likeSetArray = this._likes;
        let cardIsLiked = likeSetArray.some(likeEl => likeEl._id === this._userId);

        if (cardIsLiked) {
            this._elementLike.classList.add('element__like_active');
        } else {
            this._elementLike.classList.remove('element__like_active');
        }

        return cardElement;
    }

    _setEventListeners() {
        this._elementLike.addEventListener('click', (evt) => {
            const cardIsLiked = this._elementLike.classList.contains('element__like_active') ? true : false;
            this._handleLikeClick(cardIsLiked);
        })

        this._elementDel.addEventListener('click', () => {
            this._handleDelClick(this._element);
        })

        this._elementPic.addEventListener('click', () => {
            this._handleCardClick();
        })
    }

    setLike(likesCount) {
        this._elementLike.classList.toggle('element__like_active');
        this._elementLikesCount.textContent = likesCount;
    }
}