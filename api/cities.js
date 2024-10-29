const express = require('express');
const router = express.Router();
const citiesModel = require('../models/cities');

// GET /api/cities
router.get('/', async (req, res) => {
    try {
        const cities = await citiesModel.getAll();
        res.json({ cities }); // Wrap in an object to match frontend expectation
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /api/cities
router.post('/', async (req, res) => {
    try {
        const { city } = req.body; // Changed from city_name to match frontend
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        const newCity = await citiesModel.insert(city);
        res.status(201).json({ city: newCity });
    } catch (error) {
        console.error('Error inserting city:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;