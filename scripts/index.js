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
const editFrom = popupEditProfile.querySelector('popup__form');
// Popup add card
const popupAddCard = document.querySelector('.popup_add-card');
const closeBtnPopupAddCard = popupAddCard.querySelector('.popup__close-button');
const cardNameInput = popupAddCard.querySelector('.popup__input-text_text_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input-text_text_link');
// Popup image
const popupImage = document.querySelector('.popup_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__text');
const closeBtnPopupImage = popupImage.querySelector('.popup__close-button');

/////////////////////////// Other Variables ///////////////////////////

////////////////////////////// Functions //////////////////////////////
// Функция открытия popup-окна
function openPopup(popup) {
    popup.classList.add('popup_active');

    document.addEventListener('keydown', setListenerKeyDown);
}

// Функция закрытия popup-окна
function closePopup(popup) {
    popup.classList.remove('popup_active');

    document.removeEventListener('keydown', setListenerKeyDown);
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

// Устанавливаем слушатель по нажатию кнопки на popup
function setListenerKeyDown(evt) {
    if (evt.key === 'Escape') {
        const popupArray = Array.from(document.querySelectorAll('.popup'));

        popupArray.forEach((popupElement) => {
            if (popupElement.classList.contains('popup_active')) {
                closePopup(popupElement);
            }
        })
    }
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

popupEditProfile.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popupEditProfile);
    }
})

popupAddCard.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popupAddCard);
    }
})

cardNameInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        if (cardNameInput.validity.valid && cardLinkInput.validity.valid) {
            submitAddCardForm(evt);
        }
    }
})

cardLinkInput.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        if (cardNameInput.validity.valid && cardLinkInput.validity.valid) {
            submitAddCardForm(evt);
        }
    }
})

popupImage.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popupImage);
    }
})

popupEditProfile.addEventListener('submit', submitEditProfileForm);
popupAddCard.addEventListener('submit', submitAddCardForm);

initCards();

validationON({
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
  });


