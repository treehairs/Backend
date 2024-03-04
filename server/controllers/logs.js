const conn = require('../models/db')
const mysql = require('mysql')

const { add_data } = require('../utils/dbUtils')

/**
 * 查询所有订单
 * @param {*} req 
 * @param {*} res 
 */
const log_list = (req, res) => {
    const sql = 'SELECT * FROM logs'
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send({
            status: 200,
            data: result
        })
    })
}


module.exports = {
    log_list
}