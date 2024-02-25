const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const { handleUploadEvent } = require('../controllers/upload')

// 处理文件上传
router.post('/upload/:uid/:pid', handleUploadEvent)

module.exports = router