const express = require('express')
const router = express.Router()

const { wxLogin, shopping_cart, delete_goods, add_item_to_cart, get_address, delete_address, add_address, update_address, get_orders, add_orders, done_order, delete_order } = require('../controllers/user')

router.use(express.urlencoded({ extended: true }))

router.post('/wx/user', wxLogin)

router.get('/shopping_cart/:uid', shopping_cart)
router.delete('/shopping_cart/:cid', delete_goods)
router.post('/shopping_cart', add_item_to_cart)

router.get('/address/:uid', get_address)
router.delete('/address/:aid', delete_address)
router.post('/address', add_address)
router.post('/address/:aid', update_address)

router.get('/orders/:uid', get_orders)
router.post('/orders', add_orders)
router.post('/orders/:oid', done_order)
router.delete('/orders/:oid', delete_order)

module.exports = router