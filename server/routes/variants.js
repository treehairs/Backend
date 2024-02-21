const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const { variant_list, delete_variant } = require('../controllers/variants')

router.get('/variants', variant_list)
router.delete('/variants', delete_variant)

module.exports = router