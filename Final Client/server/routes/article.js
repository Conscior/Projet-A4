const { Router } = require('express')
const articleController = require('../controllers/article')

var router = Router()

router.get('/', articleController.article_getAll)
router.get('/:id', articleController.article_getOne)

module.exports = router;
