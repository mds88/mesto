///////////////////////////// DOM Variables ///////////////////////////
// Profile
const editButton = document.querySelector('.profile__edit-profile');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
// Elements & Element
const elements = document.querySelector('.elements-list');
const cardTemplate = elements.querySelector('#element').content;
// Popup edit profile
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeBtnPopupEditProfile = popupEditProfile.querySelector('.popup__close-button');
const profileNameInput = popupEditProfile.querySelector('.popup__input-text_text_name');
const profileAboutSelfInput = popupEditProfile.querySelector('.popup__input-text_text_about-self');
// Popup add card
const popupAddCard = document.querySelector('.popup_add-card');
const closeBtnPopupAddCard = popupAddCard.querySelector('.popup__close-button');
const cardNameInput = popupAddCard.querySelector('.popup__input-text_text_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input-text_text_link');
// Popup image
const popupImage = document.querySelector('.popup-image');
const popupImagePic = popupImage.querySelector('.popup-image__image');
const popupImageText = popupImage.querySelector('.popup-image__text');
const closeBtnPopupImage = popupImage.querySelector('.popup-image__close-button');

/////////////////////////// Other Variables ///////////////////////////

////////////////////////////// Functions //////////////////////////////
// Функция открытия popup-окна
function openPopup(popup) {
    if(popup.classList.contains('popup-image')) {
        popup.classList.add('popup-image_active');
    } else {
        popup.classList.add('popup_active');
    }
}

// Функция закрытия popup-окна
function closePopup(popup) {
    if(popup.classList.contains('popup-image')) {
        popup.classList.remove('popup-image_active');
    } else {
        popup.classList.remove('popup_active');
    }
}

// Функция по нажатию кнопки popup-окна popupEditProfile "Сохранить"
function submitEditProfileForm(evt) {
    evt.preventDefault();

    profileName.textContent = profileNameInput.value;
    profileAboutSelf.textContent = profileAboutSelfInput.value;

    closePopup(popupEditProfile);
};

// Функция по нажатию кнопки popup-окна popupAddCard "Создать"
function submitAddCardForm(evt) {
    evt.preventDefault();

    cardElement = createCard(cardNameInput.value, cardLinkInput.value);
    addCard(cardElement);

    closePopup(popupAddCard);
};

// Функция создания карточки места
function createCard(name, srcPic, altPic = undefined) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = cardElement.querySelector('.element__title');
    const cardImage = cardElement.querySelector('.element__image');
    const likeButton = cardElement.querySelector('.element__like');
    const delButton = cardElement.querySelector('.element__del');
    altPic = undefined ? altPic : 'Фото ' + name;

    cardTitle.textContent = name;
    cardImage.src = srcPic;
    cardImage.alt = altPic;

    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    })

    delButton.addEventListener('click', function() {
        const delItem = delButton.closest('.element');
        delItem.remove();
    })

    cardImage.addEventListener('click', function() {
        popupImagePic.src = srcPic;
        popupImagePic.alt = altPic;
        popupImageText.textContent = name;

        openPopup(popupImage);
    })

    return cardElement;
}

// Функция добавления карточки на сайт
function addCard(cardElement) {
    elements.prepend(cardElement);    
}

// Автозаполнение сайта первыми шестью карточками
function initCards() {
    const cardsInitPropArray = getPropCardForInitial();

    cardsInitPropArray.forEach(function (item) {
        cardElement = createCard(item.name, item.srcPic, item.altPic);
        addCard(cardElement);
    })
}

///////////////////////////////// When opening site ////////////////////////
editButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    profileNameInput.value = profileName.textContent;
    profileAboutSelfInput.value = profileAboutSelf.textContent;
    
    openPopup(popupEditProfile);
});

addButton.addEventListener('click', function(event) {
    event.preventDefault();

    cardNameInput.value = '';
    cardLinkInput.value = '';

    openPopup(popupAddCard);
});

closeBtnPopupEditProfile.addEventListener('click', function(evt) {
    evt.preventDefault();
    closePopup(popupEditProfile);
});

closeBtnPopupAddCard.addEventListener('click', function(evt) {
    evt.preventDefault();
    closePopup(popupAddCard); 
});

closeBtnPopupImage.addEventListener('click', function(event) {
    event.preventDefault();
    closePopup(popupImage);
});

popupEditProfile.addEventListener('submit', submitEditProfileForm);
popupAddCard.addEventListener('submit',submitAddCardForm);

initCards();



