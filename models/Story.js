const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    body: {
        type: String,
        requied: true
    },

    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },

    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        Default: Date.now
    }
});

module.exports = mongoose.model('Story', StorySchema);
