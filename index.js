const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/gameRoutes');
const Game = require('./models/game'); 
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/games', gameRoutes);


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        createDefaultGame();
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));

const createDefaultGame = async () => {
    try {
        const gameCount = await Game.countDocuments();
        if (gameCount === 0) {
            const defaultGame = new Game({
                score: '0',
                headshots: '0',
                kills: '0'
            });
            await defaultGame.save();
            console.log('Default game created:', defaultGame);
        }
    } catch (error) {
        console.error('Error creating default game:', error);
    }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
