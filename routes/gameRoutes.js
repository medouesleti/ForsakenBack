const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/', gameController.createGames);
router.get('/', gameController.getGames);
router.get('/:id', gameController.getGameById);
router.put('/:id', gameController.updateGameById);
router.patch('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;
