const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    category: {
        type: String,
    },
    price: {
        type: Number
    },
    restorer_id: {
        type: Number
    },
    state: {
        type: String
    },
}, { timestamps: true })

const Article = mongoose.model('article', articleSchema);

module.exports = Article;