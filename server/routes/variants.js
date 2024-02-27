const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const { variant_list, delete_variant, add_variant, update_variant } = require('../controllers/variants')

router.get('/variants', variant_list)
router.delete('/variants', delete_variant)
router.post('/variants', add_variant)
router.post('/variants/:vid', update_variant)

module.exports = router