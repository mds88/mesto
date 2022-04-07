
export default class UserInfo {
    constructor(userInfoSelectors) {
        this._name = document.querySelector(userInfoSelectors.name);
        this._aboutSelf = document.querySelector(userInfoSelectors.aboutSelf);
        this._avatar = document.querySelector(userInfoSelectors.avatar);
    }

    getUserInfo() {
        const userInfoObj = {
            name: this._name.textContent,
            about: this._aboutSelf.textContent
        }

        return userInfoObj;
    }

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._aboutSelf.textContent = userData.about;
        this._avatar.src = userData.avatar;
    }
}