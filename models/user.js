export default class User {
    static userId = 1;
    constructor(id, username, password, wallet) {
        this.id = id || User.userId++;
        this.username = username;
        this.password = password;
        this.wallet = wallet;
        this.achats = [];
    }

    addAchat(achat) {
        this.achats.push(achat);
    }
}