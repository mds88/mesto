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

        this._inputArray.forEach((inputSelector) => {
            inputSelector.addEventListener('input', () => {
                this._isValid(inputSelector);
                this.toggleButtonState();
            })
        })
    }

    _isValid(inputSelector) {
        const errorElement = this._formElement.querySelector(`.${inputSelector.id}-error`);

        if (!inputSelector.validity.valid) {        
            this._showInputError(inputSelector, errorElement);
        } else {
            this._hideInputError(inputSelector, errorElement);
        }
    }

    _showInputError(inputSelector, errorElement) {
        inputSelector.classList.add(this._objSettings.inputErrorClass);
        errorElement.textContent = inputSelector.validationMessage;
        errorElement.classList.add(this._objSettings.errorClass);
    }

    _hideInputError(inputSelector, errorElement) {
        inputSelector.classList.remove(this._objSettings.inputErrorClass);
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
    
            inputElement.classList.remove(this._objSettings.inputErrorClass);
            errorElement.classList.remove(this._objSettings.errorClass);
        })
    }
}