import User from '../models/user.js';

export function authenticate(req, res) {
    const { username, password } = req.body;
    User.findOne({ username, password })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(401).json({ message: 'Authentication failed. Invalid username or password.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: err });
        });
};

export function createUser(req, res) {
    const { username, password, wallet, achats } = req.body;

    User.findOne({ username })
        .then(exists => {
            if (exists) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const user = new User({ username, password, wallet, achats });

            return user.save()
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: err });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: err });
        });
};

export const updateProfile = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(docs => {
            res.status(200).json({ message: 'update successful!', data: docs });
        }).catch(err => {
            res.status(500).json({ message: err })
        });
};