import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, {submitForm}, validators) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input-text');
        this._validator = validators[this._popupForm.getAttribute('name')];
    }

    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach(element => {
            inputValues[element.name] = element.value;
        })
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
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
        this._validator.toggleButtonState();
    }
}