///////////////////////////// IMPORT //////////////////////////
import '../pages/index.css';

//import Card from '../scripts/components/Card.js';
import {Section} from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
// import {FormValidator} from '../scripts/components/FormValidator.js';
// import {elementsForValidationObject} from '../scripts/utils/constants.js';

import {
    cardsInitPropArray,
    ProfileEditButton,
    CardAddButton,
    profileNameInput,
    profileAboutSelfInput,
    userInfoSelectors
} from '../scripts/utils/constants.js';

import {
    createCard,
    enableValidation
} from '../scripts/utils/utils.js';
///////////////////////////// IMPORT //////////////////////////
const popupImage = new PopupWithImage('.popup_image');
popupImage.setEventListeners();

const newUserInfo = new UserInfo(userInfoSelectors);

const cardList = new Section({
    items: cardsInitPropArray,
    renderer: (cardItem) => {
        const dataCard = {
            namePic: cardItem.name,
            srcPic: cardItem.srcPic,
            altPic: cardItem.altPic
        };

        const newCardElement = createCard(dataCard, popupImage);
        cardList.addItem(newCardElement);
    }
},
'.elements-list');

cardList.renderItems();

const formValidators = enableValidation();

const popupEditProfile = new PopupWithForm(
    '.popup_edit-profile',
    {
        submitForm: (data) => {
            newUserInfo.setUserInfo(data);
        }
    },
    formValidators['profile-form']
);

popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(
    '.popup_add-card',
    {
        submitForm: (data) => {
            const itemArray = [{
                namePic: data.namePic,
                srcPic: data.linkPic,
                altPic: 'Фото ' + data.namePic
            }];

            const cardList = new Section({
                items: itemArray,
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

            cardList.renderItems();
        }
    },
    formValidators['card-add-form']
);

popupAddCard.setEventListeners();

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


