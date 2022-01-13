///////////////////////////// DOM Variables ///////////////////////////
// Main
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const popupImage = document.querySelector('.popup-image');
const elements = document.querySelector('.elements-list');
// Buttons
const editButton = document.querySelector('.profile__edit-profile');
const closeButton = popupForm.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
// Input Profile Fields
const profileNameInput = popupForm.querySelector('.popup__input-text_text_name');
const profileAboutSelfInput = popupForm.querySelector('.popup__input-text_text_about-self');
// Profile Fields
const profileName = document.querySelector('.profile__name');
const profileAboutSelf = document.querySelector('.profile__about-self');
//DOM template card
const cardTemplate = elements.querySelector('#element').content;

/////////////////////////// Other Variables ///////////////////////////

////////////////////////////// Functions //////////////////////////////
// Функция открытия popup-окна
function openPopup(popupProp) {
    popup.querySelector('.popup__title').textContent = popupProp.title;
    profileNameInput.placeholder = popupProp.placeHolder1;
    profileAboutSelfInput.placeholder = popupProp.placeHolder2;
    popup.querySelector('.popup__save-button').textContent = popupProp.buttonText;

    popup.classList.add('popup_active');
    document.body.style.overflow = 'hidden';

    closeButton.addEventListener('click', function(event) {
        event.preventDefault();
        closePopup();
    });
}

// Функция закрытия popup-окна
function closePopup() {
    popup.classList.remove('popup_active');
    document.body.style.overflow = 'auto';
}

// Функция по нажатию кнопки popup-окна "Сохранить"
function submitPopupForm(event) {
    event.preventDefault();

    if (event.target.textContent.toLowerCase().includes('сохранить')) {
        profileName.textContent = profileNameInput.value;
        profileAboutSelf.textContent = profileAboutSelfInput.value;
    } else {
        addCards(profileNameInput.value, profileAboutSelfInput.value);
    }

    closePopup();
};

// Функция добавления карточек на сайт
function addCards(name, srcPic) {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardTitle = cardElement.querySelector('.element__title');
    const cardSrcPic = cardElement.querySelector('.element__image');
    const likeButton = cardElement.querySelector('.element__like');
    const delButton = cardElement.querySelector('.element__del');
    const imagePush = cardElement.querySelector('.element__image');

    cardTitle.textContent = name;
    cardSrcPic.src = srcPic;

    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('element__like_active');
    })

    delButton.addEventListener('click', function() {
        const delItem = delButton.closest('.element');
        delItem.remove();
    })

    imagePush.addEventListener('click', function() {
        popupImage.querySelector('.popup-image__image').src = srcPic;
        popupImage.querySelector('.popup-image__text').textContent = name;
        const closeBtnPopupImage = popupImage.querySelector('.popup-image__close-button');

        popupImage.classList.add('popup-image_active');
        document.body.style.overflow = 'hidden';

        closeBtnPopupImage.addEventListener('click', function(event) {
            event.preventDefault();
            popupImage.classList.remove('popup-image_active');
            document.body.style.overflow = 'auto';
        });
    })

    elements.prepend(cardElement);
}

// Автозаполнение сайта первыми шестью карточками
function initCards() {
    const cardsInitPropArray = [
        {
            name: 'Мыс Бурхан',
            srcPic: './images/MysBurkhan.png'
        },
        {
            name: 'Мыс Хобой',
            srcPic: './images/MysHoboi.png'
        },
        {
            name: 'Осенний Байкал',
            srcPic: './images/OsenniBaikal.png'
        },
        {
            name: 'Залив на Байкале',
            srcPic: './images/ZalivNaBaikale.png'
        },
        {
            name: 'Зимний Байкал',
            srcPic: './images/ZimniBaikal.png'
        },
        {
            name: 'Пляж "Золотые писки"',
            srcPic: './images/ZolotyePeski.png'
        }
    ];

    cardsInitPropArray.forEach(function (item) {
        addCards(item.name, item.srcPic);
    })
}

///////////////////////////////// When opening site ////////////////////////
editButton.addEventListener('click', function(event) {
    event.preventDefault();

    const popupProp = {
        title: 'Редактировать профиль',
        placeHolder1: 'Ваше имя',
        placeHolder2: 'О себе',
        buttonText: 'Сохранить'
    };
    
    profileNameInput.value = profileName.textContent;
    profileAboutSelfInput.value = profileAboutSelf.textContent;
    
    openPopup(popupProp);
});

addButton.addEventListener('click', function(event) {
    event.preventDefault();

    const popupProp = {
        title: 'Новое место',
        placeHolder1: 'Название',
        placeHolder2: 'Ссылка на картинку',
        buttonText: 'Закрыть'
    };

    profileNameInput.value = '';
    profileAboutSelfInput.value = '';

    openPopup(popupProp);
});

popupForm.addEventListener('submit', submitPopupForm);

initCards();



