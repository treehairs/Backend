const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const { category_list, delete_category } = require('../controllers/categories')

router.get('/categories', category_list)
router.delete('/categories', delete_category)

module.exports = router