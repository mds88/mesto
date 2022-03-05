///////////////////////////// IMPORT Scripts //////////////////////////
import {Card} from '../scripts/Card.js';
import {FormValidator} from '../scripts/FormValidator.js';

///////////////////////////// DOM Variables ///////////////////////////
// Profile
const editProfileButton = document.querySelector('.profile__edit-profile');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
// Elements & Element
const elements = document.querySelector('.elements-list');
const cardTemplate = elements.querySelector('#element');
// Popup edit profile
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileNameInput = popupEditProfile.querySelector('.popup__input-text_text_name');
const profileAboutSelfInput = popupEditProfile.querySelector('.popup__input-text_text_about-self');
const editProfileForm = popupEditProfile.querySelector('.popup__form');
// Popup add card
const popupAddCard = document.querySelector('.popup_add-card');
const cardNameInput = popupAddCard.querySelector('.popup__input-text_text_name');
const cardLinkInput = popupAddCard.querySelector('.popup__input-text_text_link');
const addCardForm = popupAddCard.querySelector('.popup__form');

/////////////////////////// Other Variables ///////////////////////////
const elementsForValidationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
}

const dataCard = {};

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

const popupEditProfileFormValidator = new FormValidator(elementsForValidationObject, editProfileForm);
const popupAddCardFormValidator = new FormValidator(elementsForValidationObject, addCardForm);

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
function submitEditProfileForm(evt) {
    evt.preventDefault();

    profileName.textContent = profileNameInput.value;
    profileAboutSelf.textContent = profileAboutSelfInput.value;

    closePopup(popupEditProfile);
};

// Функция по нажатию кнопки popup-окна popupAddCard "Создать"
function submitAddCardForm(evt) {
    evt.preventDefault();

    dataCard.namePic = cardNameInput.value;
    dataCard.srcPic = cardLinkInput.value;
    dataCard.altPic = 'Фото ' + cardNameInput.value;
    
    const newCard = new Card(dataCard, cardTemplate);
    const cardElement = newCard.createCard();
   
    addCard(cardElement);

    closePopup(popupAddCard);
};

// Функция добавления карточки на сайт
function addCard(cardElement) {
    elements.prepend(cardElement);    
}

// Автозаполнение сайта первыми шестью карточками
function initCards() {
    cardsInitPropArray.forEach((item) => {
        dataCard.namePic = item.name;
        dataCard.srcPic = item.srcPic;
        dataCard.altPic = item.altPic;

        const newCard = new Card(dataCard, cardTemplate);
        const cardElement = newCard.createCard();

        addCard(cardElement);
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

// Сброс значений и валидации формы при повторном открытии
function resetForm(formElement) {

    formElement.reset();

    const inputArray = Array.from(formElement.querySelectorAll(elementsForValidationObject.inputSelector));
    // const saveButton = formElement.querySelector(elementsForValidationObject.submitButtonSelector);

    popupEditProfileFormValidator._toggleButtonState();

    inputArray.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(elementsForValidationObject.inputErrorClass);
        errorElement.classList.remove(elementsForValidationObject.errorClass);
    })
}

///////////////////////////////// When opening site ////////////////////////
editProfileButton.addEventListener('click', function(evt) {
    resetForm(editProfileForm);

    profileNameInput.value = profileName.textContent;
    profileAboutSelfInput.value = profileAboutSelf.textContent;
    
    openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', function(evt) {
    resetForm(addCardForm);
    openPopup(popupAddCard);
});

setClickPopupListeners();

popupEditProfile.addEventListener('submit', submitEditProfileForm);
popupAddCard.addEventListener('submit', submitAddCardForm);

initCards();

popupEditProfileFormValidator.enableValidation();
popupAddCardFormValidator.enableValidation();