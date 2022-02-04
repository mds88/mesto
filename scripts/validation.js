//////////////////// ВАЛИДАЦИЯ ФОРМ /////////////////////
// Определяем показать или скрыть ошибку проверки
function isValid(formElement, inputElement, classListObject) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, classListObject);
    } else {
        hideInputError(formElement, inputElement, classListObject);
    }
}

// Показываем ошибку если поле не прошло валидацию
function showInputError(formElement, inputElement, classListObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    inputElement.classList.add(classListObject.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(classListObject.errorClass);
}

// Прячем ошибку если поле прошло валидацию
function hideInputError(formElement, inputElement, classListObject) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(classListObject.inputErrorClass);
    errorElement.classList.remove(classListObject.errorClass);
}

//Определяем все ли поля формы прошли валидацию
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Определяем состояние активности кнопки submit
// Делаем активными если только все поля формы прошли валидацию
function toggleButtonState(inputList, saveButton, classListObject) {
    if (hasInvalidInput(inputList)) {
        saveButton.disabled = true;
        saveButton.classList.add(classListObject.inactiveButtonClass);
    } else {
        saveButton.disabled = false;
        saveButton.classList.remove(classListObject.inactiveButtonClass);
    }  
}

// Вешаем обработчики на каждое проверяемое поле форм
function setEventListeners(formElement, classListObject) {
    const inputArray = Array.from(formElement.querySelectorAll(classListObject.inputSelector));
    const saveButton = formElement.querySelector(classListObject.submitButtonSelector);

    toggleButtonState(inputArray, saveButton, classListObject);

    inputArray.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, classListObject);
            toggleButtonState(inputArray, saveButton, classListObject);
        })
    })
}

// Включаем валидацию
function validationON(classListObject) {
    const formArray = Array.from(document.querySelectorAll(classListObject.formSelector));

    formArray.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, classListObject);
    })
}
