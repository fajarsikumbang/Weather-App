const getDB = require('./database.js'); // Path disesuaikan

const getAll = async () => {
    try {
        const db = await getDB(process.env);
        if (!db) {
            throw new Error('Failed to connect to database');
        }
        return await db.cities.find({});
    } catch (error) {
        console.error('Error in getAll:', error.message);
        throw error;
    }
}

const insert = async (city_name) => {
    try {
        const db = await getDB(process.env);
        if (!db) {
            throw new Error('Failed to connect to database');
        }
        return await db.cities.insert({city_name: city_name});
    } catch (error) {
        console.error('Error in insert:', error.message);
        throw error;
    }
}

module.exports = { getAll, insert };