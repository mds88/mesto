export const elementsForValidationObject = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
}

// export const profileEditButton = document.querySelector('.profile__edit-profile');
// export const profileEditAvatarButton = document.querySelector('.profile__edit-avatar');
// export const cardAddButton = document.querySelector('.profile__add-button');

// export const profileNameInput = document.querySelector('.popup__input-text_text_name');
// export const profileAboutSelfInput = document.querySelector('.popup__input-text_text_about-self');

export const userInfoSelectors = {
    name: '.profile__name',
    aboutSelf: '.profile__about-self',
    avatar: '.profile__avatar'
}

export const domElements = {
    profileEditButton: document.querySelector('.profile__edit-profile'),
    profileEditAvatarButton: document.querySelector('.profile__edit-avatar'),
    cardAddButton: document.querySelector('.profile__add-button'),
    // Form's submit buttons
    popupEditProfileSubmitBtn: document.querySelector('.popup_edit-profile').querySelector('.popup__save-button'),
    popupEditAvatarSubmitBtn: document.querySelector('.popup_edit-avatar').querySelector('.popup__save-button'),
    popupAddCardSubmitBtn: document.querySelector('.popup_add-card').querySelector('.popup__save-button')
}