const express = require('express')
const router = express.Router()

const { wxLogin, shopping_cart, delete_goods, add_item_to_cart, get_address, delete_address } = require('../controllers/user')

router.use(express.urlencoded({ extended: true }))

router.post('/wx/user', wxLogin)
router.get('/shopping_cart/:uid', shopping_cart)
router.delete('/shopping_cart/:cid', delete_goods)
router.post('/shopping_cart', add_item_to_cart)
router.get('/address/:uid', get_address)
router.delete('/address/:aid', delete_address)

module.exports = router