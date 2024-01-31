const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const { addProduct, product_details, product_list, delete_product } = require('../controllers/products')

router.get('/products', product_list)
router.get('/products/:id', product_details)
router.post('/products', addProduct)
router.delete('/products', delete_product)

module.exports = router