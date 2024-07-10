
const express = require('express');
const router = express.Router();
const CommentControllers = require('../controllers/commentController');

const requireAuth = require('../middleware/requireAuth');


router.use(requireAuth);

// get all comments
router.get('/comments', CommentControllers.getAllComments);

// add comment
router.post('/addcomment', CommentControllers.addComment);

// get user details

router.get('/userdetails', CommentControllers.fetchUserDetails);

module.exports = router;
