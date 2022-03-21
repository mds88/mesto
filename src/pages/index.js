///////////////////////////// IMPORT //////////////////////////
import '../pages/index.css';

import {Section} from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {elementsForValidationObject} from '../scripts/utils/constants.js';

import {
    cardsInitPropArray,
    profileEditButton,
    cardAddButton,
    profileNameInput,
    profileAboutSelfInput,
    userInfoSelectors
} from '../scripts/utils/constants.js';
///////////////////////////// IMPORT //////////////////////////

///////////////////////////// FUNCTIONS //////////////////////////
// Создание карточки
const createCard = (dataCard, popupImage) => {
    const newCard = new Card(
        dataCard,
        '#element-template',
        {
            handleCardClick: () => {
                popupImage.open(dataCard);
            }
        }
    );
    const newCardElement = newCard.createCard();

    return newCardElement;
}

// Влкючение валидации на всех формах
const formValidators = {};
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(elementsForValidationObject.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(elementsForValidationObject, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });

    return formValidators;
};

enableValidation();
///////////////////////////// FUNCTIONS //////////////////////////

///////////////////////////// CLASSES //////////////////////////
// Экземпляр класса попапа с картинокой
const popupImage = new PopupWithImage('.popup_image');
// Класс для получения и установки значений в инпутах
const newUserInfo = new UserInfo(userInfoSelectors);
// Класс для отрисовки карточек на странице 
const cardList = new Section({
    items: cardsInitPropArray,
    renderer: (cardItem) => {
        const dataCard = {
            namePic: cardItem.namePic,
            srcPic: cardItem.srcPic,
            altPic: cardItem.altPic
        };

        const newCardElement = createCard(dataCard, popupImage);
        cardList.addItem(newCardElement);
    }
},
'.elements-list');
// Попап редактирования профиля
const popupEditProfile = new PopupWithForm(
    '.popup_edit-profile',
    {
        submitForm: (data) => {
            newUserInfo.setUserInfo(data);
        }
    },
    formValidators
);
// Попап добавления карточки
const popupAddCard = new PopupWithForm(
    '.popup_add-card',
    {
        submitForm: (data) => {
            const itemArray = {
                namePic: data.namePic,
                srcPic: data.linkPic,
                altPic: 'Фото ' + data.namePic
            };

            const newCardElement = createCard(itemArray, popupImage);
            cardList.addItem(newCardElement);
        }
    },
    formValidators
);
///////////////////////////// CLASSES //////////////////////////

///////////////////////////////// When opening site ////////////////////////
cardList.renderItems(cardsInitPropArray);

// Функция по нажатию кнопки редактирования профиля
function handleProfileEditButton() {
    const userInfo = newUserInfo.getUserInfo();

    profileNameInput.value = userInfo.name;
    profileAboutSelfInput.value = userInfo.aboutSelf;
    
    popupEditProfile.open();
}

profileEditButton.addEventListener('click', handleProfileEditButton);
cardAddButton.addEventListener('click', () => {
    popupAddCard.open();
});

popupEditProfile.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();