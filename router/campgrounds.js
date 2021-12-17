const express = require('express');
const router = express.Router();

const CatchAsync = require('../utils/CatchAsync');
const { campgroundSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const campgrounds = require('../controllers/campgrounds');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer  = require('multer')
const { storage } =  require('../cloudinary')
const upload = multer({ storage })

router.get('/', CatchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.post('/', isLoggedIn, upload.array('image'), validateCampground , CatchAsync(campgrounds.createCampground));

router.get('/:id', CatchAsync(campgrounds.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, CatchAsync(campgrounds.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateCampground, CatchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, CatchAsync(campgrounds.deleteCmapground));

module.exports = router;