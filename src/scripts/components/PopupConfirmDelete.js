import Popup from './Popup.js';

export default class PopupConfirmDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._confirmBtn = this._popup.querySelector('.popup__save-button');
    }

    handleConfirmDelete(handleEventClick) {
        this._handleEventClick = handleEventClick;
    }

    setEventListeners() {
        super.setEventListeners();
        this._confirmBtn.addEventListener('click', () => this._handleEventClick());
    }
}