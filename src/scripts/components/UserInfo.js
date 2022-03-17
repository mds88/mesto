
export default class UserInfo {
    constructor(userInfoSelectors) {
        this._name = document.querySelector(userInfoSelectors.name);
        this._aboutSelf = document.querySelector(userInfoSelectors.aboutSelf);
    }

    getUserInfo() {
        const userInfoObj = {
            name: this._name.textContent,
            aboutSelf: this._aboutSelf.textContent
        }

        return userInfoObj;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._aboutSelf.textContent = data.aboutSelf;
    }
}