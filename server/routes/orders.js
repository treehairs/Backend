const express = require('express')
const router = express.Router()
const path = require("path");
const fs = require("fs");

router.use(express.urlencoded({ extended: true }))

const { add_product, update_product, product_details, order_list, delete_product } = require('../controllers/orders')

router.get('/orders', order_list)
router.get('/products/:id', product_details)
router.post('/products', add_product)
router.post('/products/:id', update_product)
router.delete('/products', delete_product)

module.exports = router