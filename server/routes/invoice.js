const express = require('express')
const router = express.Router();

const {
  invoice_list,
  invoice_details,
  add_invoice,
  update_invoice,
  delete_invoice
} = require('../controllers/invoice')

// 引入请求解析体，用于解析req.body
router.use(express.urlencoded({ extended: true }))

// 获取清单/订单/发票信息
router.get('/invoice', invoice_list)
router.get('/invoice/:id', invoice_details)
router.post('/invoice', add_invoice)
router.post('/invoice/:id', update_invoice)
router.delete('/invoice', delete_invoice)


module.exports = router
