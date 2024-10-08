const Game = require('../models/game');

const createGames = async (req, res) => {
    try {
        const games = await Game.insertMany(req.body);
        res.status(201).json(games);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getGames = async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGame = async (req, res) => {
    const { score, headshots, kills } = req.body;

    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }

        // Update fields
        game.score = score || game.score;
        game.headshots = headshots || game.headshots;
        game.kills = kills || game.kills;

        await game.save();
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getGameById = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateGameById = async (req, res) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json(game);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteGame = async (req, res) => {
    try {
        const game = await Game.findByIdAndDelete(req.params.id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        res.json({ message: 'Game deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export all functions using CommonJS syntax
module.exports = {
    createGames,
    getGames,
    updateGame,
    getGameById,
    updateGameById,
    deleteGame
};
