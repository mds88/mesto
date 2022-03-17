import Card from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {elementsForValidationObject} from '../utils/constants.js';

export const createCard = (dataCard, popupImage) => {
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

const formValidators = {};
export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(elementsForValidationObject.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator(elementsForValidationObject, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });

    return formValidators;
};