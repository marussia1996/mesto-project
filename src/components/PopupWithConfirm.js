import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(selectorPopup, callbackSubmit) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup_type_delete');
        this._callbackSubmit = callbackSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
    }

}