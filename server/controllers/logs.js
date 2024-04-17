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

const add_log = (req, res) => {
    const { admin_id, module, action_type, detail, request_method } = req.body
    const info = { admin_id, module, action_type, detail, request_method }

    try {
        // 添加信息
        add_data(product_info, 'logs')
            .then(result => res.status(result).send())
    }
    catch (err) {
        console.log("添加日志失败", err);
        res.status(500).send()
    }
}


module.exports = {
    log_list,
    add_log
}