import Game from '../models/game.js';
import User from '../models/user.js';

export const addNewGame = (req, res) => {
    const { title, description, price, quantity, achats } = req.body;

    const newGame = new Game({ title, description, price, quantity, achats });

    newGame.save()
        .then(savedGame => {
            res.status(201).json(savedGame);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
};

export const getGamesList = (req, res) => {
    Game.find({})
        .then(games => {
            res.status(200).json(games);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
};

export const getGameDetails = (req, res) => {
    const id = req.params.id;

    Game.findById(id)
        .then(game => {
            res.status(200).json(game);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
};

export function buyGame(req, res) {
    const gameId = req.params.gameId;
    const userId = req.params.userId;
    Game.findById(gameId)
        .then(game => {
            User.findById(userId)
                .then(user => {
                    if (user.wallet >= game.price) {

                        user.save()
                            .then(() => {
                                res.status(200).json({ message: 'Purchase successful', user, game });
                            })
                            .catch(err => {
                                res.status(500).json({ message: err });
                            });
                    } else {
                        res.status(400).json({ message: 'Not enough money in wallet to purchase the game' });
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
};

export function updateGame(req, res) {

    Game.findByIdAndUpdate(req.params.id, req.body)
        .then(game => {
            res.status(200).json(game);
        })
        .catch(err => {
            res.status(500).json({ message: err });
        });
};