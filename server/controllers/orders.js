const conn = require('../models/db')
const mysql = require('mysql')

const { add_data } = require('../utils/dbUtils')

/**
 * 查询所有订单
 * @param {*} req 
 * @param {*} res 
 */
const order_list = (req, res) => {
    const sql = 'SELECT * FROM orders'
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send({
            status: 200,
            data: result
        })
    })
}


/**
 * 修改商品
 * @param {*} req 
 * @param {*} res 
 */
const complete_order = (req, res) => {
    const oid = req.params.id
    const sql = 'UPDATE orders SET order_status="已完成" WHERE order_id=?'
    conn.query(sql, oid, (err, results) => {
        if (err) throw err
        res.status(200).send()
    })
}


module.exports = {
    order_list,
    complete_order
}