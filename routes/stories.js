const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const { ensureAuth } = require('../middleware/auth');

// @desc Show add page
// @route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});

// @desc view the public stories
// @router GET /stories
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean();
        res.render('stories/index', {
            layout: 'main',
            stories
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc save a new story
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

// @desc edit a story
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    const story = await Story.findOne({
        _id: req.params.id
    }).lean();
    if(!story) {
        return res.render('error/404');
    }
    if(story.user!= req.user.id){
        res.redirect('/')
    }
});

module.exports = router;
