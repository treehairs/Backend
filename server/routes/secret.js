const express = require('express')
const router = express.Router()

const { secret_key } = require('../controllers/secret')

router.use('/secret', secret_key)