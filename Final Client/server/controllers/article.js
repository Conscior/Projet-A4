const Article = require('../models/Article')

const article_getAll = async (req, res) => {
    try {
        const articles = await Article.find()
        res.send(articles)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

const article_getOne = async (req, res) => {
    const id = req.params.id
    try {
        const article = await Article.findOne({_id: id})
        res.status(200).send(article)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {article_getAll, article_getOne}