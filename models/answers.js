const { func } = require('joi');
const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const answerSchema= new Schema(
    {
        answer: [ String ],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        time: Number,
        }
);
