const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
    Id: {
        type: String,
        requied: true
    },

    displayName: {
        type: String,
        requied: true
    },

    firstName: {
        type: String,
        requied: true
    },

    lastName: {
        type: String,
        requied: true
    },

    image: {
        type: String
    },
    
    createdAt: {
        type: Date,
        Default: Date.now
    }
})

module.exports = mongoose.model('story', StorySchema);