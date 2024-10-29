require('dotenv').config();
const express = require('express');
const massive = require('massive');
const path = require('path');
const bodyParser = require('body-parser');
const getDB = require('../models/database.js');  // Path disesuaikan

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mengecek mode
if (ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../client/build')));
}

// Database initialization
const initializeDB = async () => {
    try {
        await getDB({ NODE_ENV: process.env.NODE_ENV });
        console.log('Database initialized');
    } catch (error) {
        console.error('Failed to initialize database:', error);
    }
};

// Initialize database
initializeDB();

// ROUTES //
app.use("/api/cities", require('../api/cities.js'));  // Path disesuaikan
app.use("/api/weather", require('../api/weather.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;