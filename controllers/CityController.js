const { City } = require('../models');

const createCity = async (req, res) => {
    try {
        const city = await City.create(req.body);
        res.status(201).json({ message: "City created successfully", city });
    } catch (error) {
        console.error("Create City Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCities = async (req, res) => {
    try {
        const cities = await City.findAll();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCityById = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id);
        if (!city) return res.status(404).json({ message: "City not found" });
        res.status(200).json(city);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateCity = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id);
        if (!city) return res.status(404).json({ message: "City not found" });
        const updatedCity = await city.update(req.body);
        res.status(200).json(updatedCity);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteCity = async (req, res) => {
    try {
        const { id } = req.params;
        const city = await City.findByPk(id);
        if (!city) return res.status(404).json({ message: "City not found" });
        await city.destroy();
        res.status(200).json({ message: "City deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createCity,
    getCities,
    getCityById,
    updateCity,
    deleteCity
};
