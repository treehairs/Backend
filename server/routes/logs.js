const express = require('express')
const router = express.Router()
const path = require("path");
const fs = require("fs");

router.use(express.urlencoded({ extended: true }))

const { log_list, add_log } = require('../controllers/logs')

router.get('/logs', log_list)
router.post('/logs', add_log)

module.exports = router