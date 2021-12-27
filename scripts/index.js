let overlay = document.querySelector('.overlay');
let editForm = document.querySelector('.editForm');
let elements = document.querySelector('.elements');
// Buttons
let editButton = document.querySelector('.profile__editProfile');
let closeButton = overlay.querySelector('.editForm__closeButton');
// Input Profile Fields
let profileNameInput = overlay.querySelector('.editForm__inputText_text_name');
let profileAboutSelfInput = overlay.querySelector('.editForm__inputText_text_aboutSelf');
// Profile Fields
let profileName = document.querySelector('.profile__name');
let profileAboutSelf = document.querySelector('.profile__aboutSelf');


elements.addEventListener('click', function(event) {
    let activeLike = false;

    if(event.target.classList[0] !== 'element__like') {
        return;
    }

    for (let index = 0; index <= event.target.classList.length - 1; index++) {
        if(event.target.classList[index] === 'element__like_active') {
            activeLike = true;
        }
    }
    
    if(activeLike === true) {
        event.target.style.backgroundImage = "url('./images/like_diabled.svg')";
        event.target.classList.remove('element__like_active');
    } else {
        event.target.style.backgroundImage = "url('./images/like_active.svg')";
        event.target.classList.add('element__like_active');
    }
});

function openEditForm() {
    overlay.classList.add('overlay_active');
    document.body.style.overflow = 'hidden';
}

function closeEditForm() {
    overlay.classList.remove('overlay_active');
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
