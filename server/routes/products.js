const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const { add_product,update_product, product_details, product_list, delete_product } = require('../controllers/products')

router.get('/products', product_list)
router.get('/products/:id', product_details)
router.post('/products', add_product)
router.post('/products/:id', update_product)
router.delete('/products', delete_product)

module.exports = router