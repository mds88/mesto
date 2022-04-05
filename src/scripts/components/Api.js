//Описание API класса и методов
export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getProfileInfo() {
        const urlResource = '/users/me';

        return fetch(this._baseUrl + urlResource, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getInitialCards() {
        const urlResource = '/cards';

        return fetch(this._baseUrl + urlResource, {
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    setProfileInfo(data) {
        const urlResource = '/users/me';

        return fetch(this._baseUrl + urlResource, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.aboutSelf
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    addCard(data) {
        const urlResource = '/cards';

        return fetch(this._baseUrl + urlResource, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.namePic,
                link: data.linkPic
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    delCard(idPic) {
        const urlResource = '/cards/' + idPic;

        return fetch(this._baseUrl + urlResource, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    setLike(cardIsLiked, idPic) {
        const urlResource = '/cards/' + idPic + '/likes';

        if (!cardIsLiked) {
            this._methodUrl = 'PUT';
        } else {
            this._methodUrl = 'DELETE';
        }

        return fetch(this._baseUrl + urlResource, {
            method: this._methodUrl,
            headers: this._headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    setAvatar(linkAvatar) {
        const urlResource = '/users/me/avatar';

        return fetch(this._baseUrl + urlResource, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: linkAvatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}