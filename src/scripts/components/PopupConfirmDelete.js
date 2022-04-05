import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector, {eventClick}) {
        super(popupSelector);
        this._eventClick = eventClick;
    }

    handelConfirmDelete(idPic, element) {
        const confirmBtn = this._popup.querySelector('.popup__save-button');

        confirmBtn.addEventListener('click', (evt) =>{
            this._eventClick(idPic, element);
            super.close();
        })
    }
}