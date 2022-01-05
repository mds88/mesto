let overlay = document.querySelector('.popup');
let editForm = document.querySelector('.popup__container');
let elements = document.querySelector('.elements');
// Buttons
let editButton = document.querySelector('.profile__edit-profile');
let closeButton = editForm.querySelector('.popup__close-button');
// Input Profile Fields
let profileNameInput = editForm.querySelector('.popup__input-text_text_name');
let profileAboutSelfInput = editForm.querySelector('.popup__input-text_text_about-self');
// Profile Fields
let profileName = document.querySelector('.profile__name');
let profileAboutSelf = document.querySelector('.profile__about-self');


function openEditForm() {
    overlay.classList.add('popup_active');
    document.body.style.overflow = 'hidden';
}

function closeEditForm() {
    overlay.classList.remove('popup_active');
    document.body.style.overflow = 'auto';
}

editButton.addEventListener('click', function(event) {
    event.preventDefault();
    openEditForm();
    profileNameInput.value = profileName.textContent;
    profileAboutSelfInput.value = profileAboutSelf.textContent;
});

closeButton.addEventListener('click', function(event) {
    event.preventDefault();
    closeEditForm();
});

function submitProfileForm(event) {
    event.preventDefault();

    profileName.textContent = profileNameInput.value;
    profileAboutSelf.textContent = profileAboutSelfInput.value;

    closeEditForm();
};

editForm.addEventListener('submit', submitProfileForm);
