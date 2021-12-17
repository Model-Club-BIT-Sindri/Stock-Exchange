const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews')
const CatchAsync = require('../utils/CatchAsync');
const {validateReview , isLoggedIn, isReviewAuthor} = require('../middleware')

const ExpressError = require('../utils/ExpressError');





router.post('/', isLoggedIn, validateReview , CatchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, CatchAsync(reviews.deleteReview))

module.exports = router;