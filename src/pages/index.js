///////////////////////////// IMPORT //////////////////////////
import '../pages/index.css';

import { Section } from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupConfirmDelete from '../scripts/components/PopupConfirmDelete.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Api from '../scripts/components/Api.js';

import {
    elementsForValidationObject,
    userInfoSelectors,
    domElements
} from '../scripts/utils/constants.js';
///////////////////////////// IMPORT //////////////////////////

let userId;

///////////////////////////// FUNCTIONS //////////////////////////
// Создание карточки
const createCard = (dataCard) => {
    const newCard = new Card(
        dataCard,
        '#element-template',
        {
            handleCardClick: () => {
                popupImage.open(dataCard);
            },
            handleDelClick: (element) => {
                popupConfirmDelImg.open();
                popupConfirmDelImg.handleConfirmDelete(() => {
                    api.delCard(dataCard._id)
                        .then(() => {
                            element.remove();
                            popupConfirmDelImg.close();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            },
            handleLikeClick: (cardIsLiked) => {
                api.setLike(cardIsLiked, dataCard._id)
                    .then((res) => {
                        newCard.setLike(res.likes.length);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        userId
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
const userInfo = new UserInfo(userInfoSelectors);
// Класс для отрисовки карточек на странице 
const cardList = new Section({
    renderer: (cardItem) => {
        const newCardElement = createCard(cardItem);
        cardList.addItem(newCardElement);
    }
},
    '.elements-list');
// Попап редактирования профиля
const popupEditProfile = new PopupWithForm(
    '.popup_edit-profile',
    {
        submitForm: (userDataInput) => {
            popupEditProfile.renderLoading(true, 'Сохранение...');

            api.setProfileInfo(userDataInput)
                .then((result) => {
                    userInfo.setUserInfo(result);
                    popupEditProfile.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    domElements.popupEditProfileSubmitBtn.textContent = 'Сохранить';
                });
        }
    },
    formValidators
);
// Попап редактирования аватара профиля
const popupEditProfileAvatar = new PopupWithForm(
    '.popup_edit-avatar',
    {
        submitForm: (data) => {
            popupEditProfileAvatar.renderLoading(true, 'Сохранение...');

            api.setAvatar(data.linkPicAvatar)
                .then((result) => {
                    userInfo.setUserInfo(result);
                    popupEditProfileAvatar.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    domElements.popupEditAvatarSubmitBtn.textContent = 'Сохранить';
                });
        }
    },
    formValidators
);
// Попап добавления карточки
const popupAddCard = new PopupWithForm(
    '.popup_add-card',
    {
        submitForm: (data) => {
            popupAddCard.renderLoading(true, 'Сохранение...');

            api.addCard(data)
                .then((card) => {
                    const newCardElement = createCard(card, popupImage);
                    cardList.addItem(newCardElement);
                    popupAddCard.close();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    domElements.popupAddCardSubmitBtn.textContent = 'Сохранить';
                });
        }
    },
    formValidators
);
// Попап подтверждения удаления картинки
const popupConfirmDelImg = new PopupConfirmDelete(
    '.popup_confirm-delete'
);

//Подключаем API
const cohort = 'cohort-38';
const apiToken = '2768825c-ff22-4e6b-8e90-3296ec35c511';

const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohort}`,
    headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
    }
});
///////////////////////////// CLASSES //////////////////////////

///////////////////////////////// When opening site ////////////////////////
Promise.all([api.getProfileInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData);
        cardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    });

// Функция по нажатию кнопки редактирования профиля
function handleProfileEditButton() {
    const userData = userInfo.getUserInfo();

    popupEditProfile.setInputValues(userData);
    popupEditProfile.open();
}

domElements.profileEditButton.addEventListener('click', handleProfileEditButton);
domElements.cardAddButton.addEventListener('click', () => {
    popupAddCard.open();
});

domElements.profileEditAvatarButton.addEventListener('click', () => {
    popupEditProfileAvatar.open();
});

popupEditProfile.setEventListeners();
popupEditProfileAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupConfirmDelImg.setEventListeners();