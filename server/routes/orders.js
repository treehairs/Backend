const express = require('express')
const router = express.Router()
const path = require("path");
const fs = require("fs");

router.use(express.urlencoded({ extended: true }))

const { order_list, complete_order } = require('../controllers/orders')

router.get('/orders', order_list)
// router.post('/orders', complete_order)

module.exports = router