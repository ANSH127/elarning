const Comment = require('../models/commentModel');
const User = require('../models/userModel');

// get all comments with user name filter by slug
const getAllComments = async (req, res) => {
    
    try {
        const comments = await Comment.find({ slug: req.query.slug }).populate('user', 'name');
        res.status(200).json({ comments });

    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// add comment

const addComment = async (req, res) => {
    const { comment,slug } = req.body;
    try {
        const newComment = await Comment.create({ slug,comment, user: req.user._id });
        res.status(201).json({ newComment });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    
}


const fetchUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = { getAllComments, addComment,fetchUserDetails };