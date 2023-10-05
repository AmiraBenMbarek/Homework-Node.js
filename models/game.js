export default class Game {
    static gameId = 1;
    constructor(id, title, description, price, quantity) {
        this.id = id || Game.gameId++;
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.achats = [];
    }

    addAchat(achat) {
        this.achats.push(achat);
    }
}