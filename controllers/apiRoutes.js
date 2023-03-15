const router = require('express').Router();
const { Post, Comment } = require('../models');

// Create a new post.

router.post('/posts', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a post by Id.

router.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a post by id.

router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Create a new comment

router.post('/comments', async (req, res) => {
    try {
        const newComment = await Comment.update(
            {
                comment_text: req.body.comment_text
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a comment by id.

router.delete('/comments/:id', async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletedComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a comment.

router.put('/comments/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(
            {
                comment_text: req.body.comment_text
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get post by id.

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    },
                },
            ],
        });
        const post = postData.get({ plain: true });
        res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;