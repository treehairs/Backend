const express = require('express')
const router = express.Router()

const { wxLogin } = require('../controllers/user')

router.use(express.urlencoded({ extended: true }))

router.post('/wx/user', wxLogin)

module.exports = router