const mongoose = require('mongoose');
const User = require('./userModel');
const commentSchema = new mongoose.Schema({

    slug: {
        type: String,
        required: true
    },

    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;