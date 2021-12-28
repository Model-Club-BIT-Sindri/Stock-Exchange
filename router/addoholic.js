const express = require('express');
const router = express.Router();

const CatchAsync = require('../utils/CatchAsync');
const { campgroundSchema } = require('../schemas.js');
const ExpressError = require('../utils/ExpressError');
const Answer = require('../models/answers');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer  = require('multer')
const { storage } =  require('../cloudinary')
const upload = multer({ storage })

router.get('/', (req,res)=>{
    res.render('addoholic/show');
})
router.get('/answer',isLoggedIn, CatchAsync( async(req,res)=>{
    res.render('addoholic/new');
}))
router.post('/answer',isLoggedIn, CatchAsync(async(req,res)=>{
    const answer= new Answer(req.body.answer);
    answer.author=req.user._id;
    const logouttime=Date.now;
    const timeInMins= logouttime - req.secret;
    answer.time = timeInMins;
    await answer.save();
}))