import User from '../models/user.js';
import Game from '../models/game.js';
let games = [];

// const users = [
//     new User(1, 'user1', 'password1', 100.00),
//     new User(2, 'user2', 'password2', 150.00),
// ];
// let id = 0;
let users = [];

export function authenticate(req, res) {
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
    }
};

export function createUser(req, res) {
    const { username, password, wallet, achats } = req.body;

    if (users.some((user) => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User(null, username, password, wallet, achats);

    users.push(user);

    res.status(201).json({ username, password, wallet, achats });
};

export function updateProfile(req, res) {
    const id = req.params.id;
    const { username, password, wallet, achats } = req.body;


    const userId = users.findIndex((x) => x.id == id);

    if (userId === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users[userId].username = username;
    users[userId].password = password;
    users[userId].wallet = wallet;


    const userArray = {
        username: users[userId].username,
        password: users[userId].password,
        wallet: users[userId].wallet,
    };

    if (achats) {
        userArray.achats = achats;
    }

    res.status(200).json(userArray);
};

export function addNewGame(req, res) {
    const { title, description, price, quantity, achats } = req.body;

    const game = new Game(null, title, description, price, quantity, achats);

    games.push(game);

    console.log(games);

    res.status(201).json({ title, description, price, quantity, achats });
};

export function getGamesList(req, res) {
    let gameList = games.map((game) => ({
        id: game.id,
        title: game.title,
        price: game.price,
    }));

    console.log(games);
    console.log(gameList);
    res.status(200).json(gameList);
};

export function getGameDetails(req, res) {
    const gameId = req.params.id;

    const game = games.find((game) => game.id == gameId);

    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json({
        id: game.id,
        title: game.title,
        description: game.description,
        price: game.price,
        quantity: game.quantity,
        achats: game.achats
    });
};

export function buyGame(req, res) {
    const gameId = req.params.id;
    const userId = req.params.id;

    console.log(gameId);
    console.log(userId);

    const game = games.find((game) => game.id == gameId);

    const findIndex = users.findIndex((user) => user.id == userId);

    if (game && findIndex !== -1) {
        const user = users[findIndex];

        if (user.wallet >= game.price) {

            user.addAchat(game);


            res.status(200).json({ message: 'Purchase successful', user, game });
        } else {
            res.status(400).json({ message: 'Not enough money in wallet to purchase the game' });
        }
    } else {
        res.status(404).json({ message: 'Game or user not found' });
    }
};

export function updateGame(req, res) {
    const id = req.params.id;
    const { title, description, price, quantity, achats } = req.body;


    const gameId = games.findIndex((x) => x.id == id);

    if (gameId === -1) {
        return res.status(404).json({ message: 'Game not found' });
    }

    games[gameId].title = title;
    games[gameId].description = description;
    games[gameId].price = price;
    games[gameId].quantity = quantity;

    const gameArray = {
        title: games[gameId].title,
        description: games[gameId].description,
        price: games[gameId].price,
        quantity: games[gameId].quantity,
    };

    if (achats) {
        gameArray.achats = achats;
    }

    res.status(200).json(gameArray);
};