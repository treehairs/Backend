const express = require('express')
const router = express.Router()
const path = require("path");
const fs = require("fs");

router.use(express.urlencoded({ extended: true }))

const { get_statistics, total_sales } = require('../controllers/statistics')

router.get('/statistics', get_statistics)
router.get('/total_sales', total_sales)

module.exports = router