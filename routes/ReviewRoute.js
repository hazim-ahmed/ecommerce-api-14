const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/ReviewController');

const { createReviewValidation, updateReviewValidation } = require('../validations/review.validation');
const validateRequest = require('../middleware/validateRequest');

router.post('/reviews', createReviewValidation, validateRequest, reviewController.createReview);
router.get('/reviews', reviewController.getReviews);
router.get('/reviews/:id', reviewController.getReviewById);
router.put('/reviews/:id', updateReviewValidation, validateRequest, reviewController.updateReview);
router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;
