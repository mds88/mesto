///////////////////////////// IMPORT Scripts //////////////////////////
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';

///////////////////////////// DOM Variables ///////////////////////////
// Profile
const ProfileEditButton = document.querySelector('.profile__edit-profile');
const CardAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
// Elements & Element
const elements = document.querySelector('.elements-list');
// const cardTemplate = elements.querySelector('#element');
// Popup edit profile
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileNameInput = popupEditProfile.querySelector('.popup__input-text_text_name');
const profileAboutSelfInput = popupEditProfile.querySelector('.popup__input-text_text_about-self');
const profileEditForm = popupEditProfile.querySelector('.popup__form');
// Popup add card
const popupAddCard = document.querySelector('.popup_add-card');
const cardNameInput = popupAddCard.querySelector('.popup__input-text_text_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input-text_text_link');
const cardAddForm = popupAddCard.querySelector('.popup__form');
// Popup image
export const popupImage = document.querySelector('.popup_image');
export const popupImagePic = popupImage.querySelector('.popup__image');
export const popupImageText = popupImage.querySelector('.popup__text');

/////////////////////////// Other Variables ///////////////////////////
const elementsForValidationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
}

const cardsInitPropArray = [
    {
        name: 'Мыс Бурхан',
        srcPic: './images/MysBurkhan.png',
        altPic: 'Фото мыса Бурхан'
    },
    {
        name: 'Мыс Хобой',
        srcPic: './images/MysHoboi.png',
        altPic: 'Фото мыса Хобой'
    },
    {
        name: 'Осенний Байкал',
        srcPic: './images/OsenniBaikal.png',
        altPic: 'Фото Байкала осенью'
    },
    {
        name: 'Залив на Байкале',
        srcPic: './images/ZalivNaBaikale.png',
        altPic: 'Фото залива Байкала'
    },
    {
        name: 'Зимний Байкал',
        srcPic: './images/ZimniBaikal.png',
        altPic: 'Фото Байкала зимой'
    },
    {
        name: 'Пляж "Золотые писки"',
        srcPic: './images/ZolotyePeski.png',
        altPic: 'Фото пляжа Байкала'
    }
];

const popupProfileEditFormValidator = new FormValidator(elementsForValidationObject, profileEditForm);
const popupCardAddFormValidator = new FormValidator(elementsForValidationObject, cardAddForm);

////////////////////////////// Functions //////////////////////////////
// Функция открытия popup-окна
export function openPopup(popup) {
    popup.classList.add('popup_active');

    document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия popup-окна
function closePopup(popup) {
    popup.classList.remove('popup_active');

    document.removeEventListener('keydown', handleEscClose);
}

// Функция по нажатию кнопки popup-окна popupEditProfile "Сохранить"
function submitProfileEditForm(evt) {
    evt.preventDefault();

    profileName.textContent = profileNameInput.value;
    profileAboutSelf.textContent = profileAboutSelfInput.value;

    closePopup(popupEditProfile);
};

// Функция по нажатию кнопки popup-окна popupAddCard "Создать"
function submitCardAddForm(evt) {
    evt.preventDefault();

    const dataCard = {
        namePic: cardNameInput.value,
        srcPic: cardLinkInput.value,
        altPic: 'Фото ' + cardNameInput.value
    };

    const cardElement = createCard(dataCard);

    elements.prepend(cardElement);

    closePopup(popupAddCard);
};

// Функция создания экземпляра карточки
function createCard(dataCard) {
    const newCard = new Card(dataCard, '#element-template');
    const newCardElement = newCard.createCard();

    return newCardElement;
}

// Автозаполнение сайта первыми шестью карточками
function initCards() {
    cardsInitPropArray.forEach((item) => {
        const dataCard = {
            namePic: item.name,
            srcPic: item.srcPic,
            altPic: item.altPic
        };

        const cardElement = createCard(dataCard);

        elements.prepend(cardElement);
    })
}

// Устанавливаем слушатель по нажатию кнопки на popup
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_active');
        closePopup(popupActive);
    }
}

// Устанавливаем слушатели на Popup по клику для закрытия
function setClickPopupListeners() {
    const popupArray = Array.from(document.querySelectorAll('.popup'));

    popupArray.forEach((popupElement) => {
        popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
                closePopup(popupElement);
            }
        })
    })
}

// Функция по нажатию кнопки редактирования профиля
function handleProfileEditButton() {
    popupProfileEditFormValidator.resetForm();

    profileNameInput.value = profileName.textContent;
    profileAboutSelfInput.value = profileAboutSelf.textContent;

    popupProfileEditFormValidator.toggleButtonState();
    
    openPopup(popupEditProfile);
}

// Функция по нажатию кнопки добавления карточки
function handleCardAddBatton() {
    popupCardAddFormValidator.resetForm();
    popupCardAddFormValidator.toggleButtonState();
    openPopup(popupAddCard);
}

///////////////////////////////// When opening site ////////////////////////
ProfileEditButton.addEventListener('click', handleProfileEditButton);
CardAddButton.addEventListener('click', handleCardAddBatton);

setClickPopupListeners();

popupEditProfile.addEventListener('submit', submitProfileEditForm);
popupAddCard.addEventListener('submit', submitCardAddForm);

initCards();

popupProfileEditFormValidator.enableValidation();
popupCardAddFormValidator.enableValidation();