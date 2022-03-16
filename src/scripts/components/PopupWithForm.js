import Popup from './Popup.js';
import {FormValidator} from './FormValidator.js';
import {elementsForValidationObject} from '../utils/constants.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}) {
        super(popupSelector);
        this._popupElement = document.querySelector(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._validator = new FormValidator(elementsForValidationObject, this._popupForm);
    }

    _getInputValues() {
        const inputArray = this._popupElement.querySelectorAll('.popup__input-text');
        return inputArray;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this._getInputValues();
            this._submitForm(data);
            this.close();
        });
    }

    close() {
        super.close();
        this._validator.resetForm();
    }

    open() {
        super.open();
        this._validator.enableValidation();
        this._validator.toggleButtonState();
    }
}