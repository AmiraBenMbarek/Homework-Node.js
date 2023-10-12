import express from 'express';

import { getGamesList, getGameDetails, addNewGame, updateGame, buyGame } from '../controllers/gameController.js';
const router = express.Router();

router.route('/getGamesList').get(getGamesList);
router.route('/getGameDetails/:id').get(getGameDetails);
router.route('/addNewGame').post(addNewGame);
router.route('/updateGame/:id').put(updateGame);
router.route('/buyGame/:gameId/:userId').post(buyGame);

export default router;