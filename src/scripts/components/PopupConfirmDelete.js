import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmBtn = this._popup.querySelector('.popup__save-button');
        this._confirmBtn.addEventListener('click', () => this._eventClick());
    }

    handelConfirmDelete(eventClick) {
        this._eventClick = eventClick;
    }
}