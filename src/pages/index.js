///////////////////////////// IMPORT //////////////////////////
import '../pages/index.css';

import {Card} from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {elementsForValidationObject} from '../scripts/utils/constants.js';

import {
    cardsInitPropArray,
    ProfileEditButton,
    CardAddButton,
    profileNameInput,
    profileAboutSelfInput,
    userInfoSelectors,
    profileEditForm,
    cardAddForm
} from '../scripts/utils/constants.js';
///////////////////////////// IMPORT //////////////////////////
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

const cardList = new Section({
    items: cardsInitPropArray,
    renderer: (cardItem) => {
        const dataCard = {
            namePic: cardItem.name,
            srcPic: cardItem.srcPic,
            altPic: cardItem.altPic
        };

        const newCard = new Card(
            dataCard,
            '#element-template',
            {handleCardClick: () => {
                popupImage.open(dataCard);
            }}
        );
        const newCardElement = newCard.createCard();

        cardList.addItem(newCardElement);
    }
},
'.elements-list');

cardList.renderItems();

const validatorEditProfilePopup = new FormValidator(elementsForValidationObject, profileEditForm);
const validatorAddCardPopup = new FormValidator(elementsForValidationObject, cardAddForm);

const popupEditProfile = new PopupWithForm(
    '.popup_edit-profile', 
    {submitForm: (data) => {
        const newUserInfo = new UserInfo(userInfoSelectors);
        newUserInfo.setUserInfo(data);
    }},
    validatorEditProfilePopup
);

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(
    '.popup_add-card', 
    {submitForm: (data) => {
        const itemArray = [{
            namePic: data[0].value,
            srcPic: data[1].value,
            altPic: 'Фото ' + data[0].value
        }];
    
        const cardList = new Section({
            items: itemArray,
            renderer: (cardItem) => {
                const dataCard = {
                    namePic: cardItem.namePic,
                    srcPic: cardItem.srcPic,
                    altPic: cardItem.altPic
                };
        
                const newCard = new Card(
                    dataCard,
                    '#element-template',
                    {handleCardClick: () => {
                        popupImage.open(dataCard);
                    }}
                );

                const newCardElement = newCard.createCard();
        
                cardList.addItem(newCardElement);
            }
        },
        '.elements-list');
    
        cardList.renderItems();
    }},
    validatorAddCardPopup
);

popupAddCard.setEventListeners();

const newUserInfo = new UserInfo(userInfoSelectors);

validatorEditProfilePopup.enableValidation();
validatorAddCardPopup.enableValidation();

// Функция по нажатию кнопки редактирования профиля
function handleProfileEditButton() {
    const userInfo = newUserInfo.getUserInfo();

    profileNameInput.value = userInfo.name;
    profileAboutSelfInput.value = userInfo.aboutSelf;
    
    popupEditProfile.open();
}

///////////////////////////////// When opening site ////////////////////////
ProfileEditButton.addEventListener('click', handleProfileEditButton);
CardAddButton.addEventListener('click', () => {
    popupAddCard.open();
});


