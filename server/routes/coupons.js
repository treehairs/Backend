const express = require('express')
const router = express.Router();

const { coupons } = require('../controllers/coupons')

// 引入请求解析体，用于解析req.body
router.use(express.urlencoded({ extended: true }))

// 获取优惠券信息
router.get('/wx/coupons/:uid', coupons)

module.exports = router