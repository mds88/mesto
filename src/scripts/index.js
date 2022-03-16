///////////////////////////// IMPORT //////////////////////////
import '../styles/index.css';

import {Card} from './components/Card.js';
import {Section} from './components/Section.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

import {
    cardsInitPropArray,
    ProfileEditButton,
    CardAddButton,
    profileNameInput,
    profileAboutSelfInput,
    userInfoSelectors
} from './utils/constants.js';
///////////////////////////// IMPORT //////////////////////////

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
                const popupImage = new PopupWithImage('.popup_image', dataCard);
                popupImage.open();
            }}
        );
        const newCardElement = newCard.createCard();

        cardList.addItem(newCardElement);
    }
},
'.elements-list');

cardList.renderItems();

const popupEditProfile = new PopupWithForm(
    '.popup_edit-profile', 
    {submitForm: (data) => {
        const newUserInfo = new UserInfo(userInfoSelectors);
        newUserInfo.setUserInfo(data);
    }}
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
                        const popupImage = new PopupWithImage('.popup_image', dataCard);
                        popupImage.open();
                    }}
                );

                const newCardElement = newCard.createCard();
        
                cardList.addItem(newCardElement);
            }
        },
        '.elements-list');
    
        cardList.renderItems();
    }}
);

popupAddCard.setEventListeners();

const newUserInfo = new UserInfo(userInfoSelectors);

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