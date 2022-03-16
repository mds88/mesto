import MysBurkhan from '../../images/MysBurkhan.png';
import MysHoboi from '../../images/MysHoboi.png';
import OsenniBaikal from '../../images/OsenniBaikal.png';
import ZalivNaBaikale from '../../images/ZalivNaBaikale.png';
import ZimniBaikal from '../../images/ZimniBaikal.png';
import ZolotyePeski from '../../images/ZolotyePeski.png';

export const cardsInitPropArray = [
    {
        name: 'Мыс Бурхан',
        srcPic: MysBurkhan,
        altPic: 'Фото мыса Бурхан'
    },
    {
        name: 'Мыс Хобой',
        srcPic: MysHoboi,
        altPic: 'Фото мыса Хобой'
    },
    {
        name: 'Осенний Байкал',
        srcPic: OsenniBaikal,
        altPic: 'Фото Байкала осенью'
    },
    {
        name: 'Залив на Байкале',
        srcPic: ZalivNaBaikale,
        altPic: 'Фото залива Байкала'
    },
    {
        name: 'Зимний Байкал',
        srcPic: ZimniBaikal,
        altPic: 'Фото Байкала зимой'
    },
    {
        name: 'Пляж "Золотые писки"',
        srcPic: ZolotyePeski,
        altPic: 'Фото пляжа Байкала'
    }
];

export const elementsForValidationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
}

export const profileEditForm = document.querySelector('.popup_edit-profile').querySelector(elementsForValidationObject.formSelector);
export const cardAddForm = document.querySelector('.popup_add-card').querySelector(elementsForValidationObject.formSelector);

export const ProfileEditButton = document.querySelector('.profile__edit-profile');
export const CardAddButton = document.querySelector('.profile__add-button');

export const profileNameInput = document.querySelector('.popup__input-text_text_name');
export const profileAboutSelfInput = document.querySelector('.popup__input-text_text_about-self');

export const userInfoSelectors = {
    name: '.profile__name',
    aboutSelf: '.profile__about-self'
}