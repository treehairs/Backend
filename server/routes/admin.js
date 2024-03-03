const express = require('express')
const router = express.Router()
const path = require("path");
const fs = require("fs");

router.use(express.urlencoded({ extended: true }))

const { login } = require('../controllers/admin')

router.post('/login', login)

module.exports = router