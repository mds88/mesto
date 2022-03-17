//Класс валидации форм. В класс передается объект настроек и селектор формы
export class FormValidator {
    constructor(objSettings, formElement) {
        this._objSettings = objSettings;
        this._formElement = formElement;

        this._inputArray = Array.from(this._formElement.querySelectorAll(this._objSettings.inputSelector));
        this._saveButton = this._formElement.querySelector(this._objSettings.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._inputArray.forEach((input) => {
            input.addEventListener('input', () => {
                this._isValid(input);
                this.toggleButtonState();
            })
        })
    }

    _isValid(input) {
        const errorElement = this._formElement.querySelector(`.${input.id}-error`);

        if (!input.validity.valid) {        
            this._showInputError(input, errorElement);
        } else {
            this._hideInputError(input, errorElement);
        }
    }

    _showInputError(input, errorElement) {
        input.classList.add(this._objSettings.inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._objSettings.errorClass);
    }

    _hideInputError(input, errorElement) {
        input.classList.remove(this._objSettings.inputErrorClass);
        errorElement.classList.remove(this._objSettings.errorClass);
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._saveButton.disabled = true;
            this._saveButton.classList.add(this._objSettings.inactiveButtonClass);
        } else {
            this._saveButton.disabled = false;
            this._saveButton.classList.remove(this._objSettings.inactiveButtonClass);
        }  
    }

    _hasInvalidInput() {
        return this._inputArray.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }
    
    resetForm() {
        this._formElement.reset();

        this._inputArray.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
            this._hideInputError(inputElement, errorElement);
        })
    }
}