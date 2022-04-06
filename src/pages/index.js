///////////////////////////// IMPORT //////////////////////////
import '../pages/index.css';

import { Section } from '../scripts/components/Section.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupConfirmDelete from '../scripts/components/PopupConfirmDelete.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Card from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { elementsForValidationObject } from '../scripts/utils/constants.js';
import Api from '../scripts/components/Api.js';

import {
    profileEditAvatarButton,
    profileEditButton,
    cardAddButton,
    profileNameInput,
    profileAboutSelfInput,
    userInfoSelectors
} from '../scripts/utils/constants.js';
///////////////////////////// IMPORT //////////////////////////

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
                popupConfirmDelImg.handelConfirmDelete(() => {
                    api.delCard(dataCard._id)
                        .then(() => {
                            element.remove();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    popupConfirmDelImg.close();
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
        submitForm: (data) => {
            const submitBtn = document.querySelector('.popup_edit-profile').querySelector('.popup__save-button');
            
            submitBtn.textContent = 'Сохранение...';

            api.setProfileInfo(data)
                .then((result) => {
                    document.querySelector(userInfoSelectors.name).textContent = result.name;
                    document.querySelector(userInfoSelectors.aboutSelf).textContent = result.about;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    submitBtn.textContent = 'Сохранить'
                    popupEditProfile.close();
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
            const submitBtn = document.querySelector('.popup_edit-avatar').querySelector('.popup__save-button');

            submitBtn.textContent = 'Сохранение...';

            api.setAvatar(data.linkPicAvatar)
                .then(() => {
                    document.querySelector(userInfoSelectors.avatar).src = data.linkPicAvatar;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    submitBtn.textContent = 'Сохранить'
                    popupEditProfileAvatar.close();
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
            const submitBtn = document.querySelector('.popup_add-card').querySelector('.popup__save-button');

            submitBtn.textContent = 'Сохранение...';

            api.addCard(data)
                .then((card) => {
                    const newCardElement = createCard(card, popupImage);
                    cardList.addItem(newCardElement);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    submitBtn.textContent = 'Сохранить';
                    popupAddCard.close();
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
api.getProfileInfo()
    .then((result) => {
        document.querySelector(userInfoSelectors.name).textContent = result.name;
        document.querySelector(userInfoSelectors.aboutSelf).textContent = result.about;
        document.querySelector(userInfoSelectors.avatar).src = result.avatar;
    })
    .catch((err) => {
        console.log(err);
    });

api.getInitialCards()
    .then((cards) => {
        cardList.renderItems(cards);
    })
    .catch((err) => {
        console.log(err);
    });

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

profileEditAvatarButton.addEventListener('click', () => {
    popupEditProfileAvatar.open();
});

popupEditProfile.setEventListeners();
popupEditProfileAvatar.setEventListeners();
popupAddCard.setEventListeners();
popupImage.setEventListeners();
popupConfirmDelImg.setEventListeners();