const { Review } = require('../models');

const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json({ message: "Review created successfully", review });
    } catch (error) {
        console.error("Create Review Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        const updatedReview = await review.update(req.body);
        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if (!review) return res.status(404).json({ message: "Review not found" });
        await review.destroy();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createReview,
    getReviews,
    getReviewById,
    updateReview,
    deleteReview
};
