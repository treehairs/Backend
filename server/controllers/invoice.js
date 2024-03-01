const conn = require('../models/db')
const mysql = require('mysql')

const { add_data } = require('../utils/dbUtils')

/**
 * 查询所有订单
 * @param {*} req 
 * @param {*} res 
 */
const invoice_list = (req, res) => {
    const sql = 'SELECT * FROM invoice_list'
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send({
            status: 200,
            data: result
        })
    })
}

/**
 * 查询某个订单的详情信息
 * @param {*} req 
 * @param {*} res 
 */
const invoice_details = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM invoice_details WHERE invoice_id=?`;

    conn.query(sql, id, (err, result) => {
        if (err) throw err
        res.send({ data: result })
    })
}

/**
 * 修改商品
 * @param {*} req 
 * @param {*} res 
 */
const update_invoice = (req, res) => {
    const pid = req.params.id
    const { invoice_name, description, category_id, promo_image, invoice_status } = req.body
    const info = { invoice_name, description, category_id, promo_image, invoice_status }
    const sql = 'UPDATE invoices SET ? WHERE invoice_id=?'
    conn.query(sql, [info, pid], (err, results) => {
        if (err) throw err
        res.send({ status: 200 })
    })
}

/**
 * 删除商品
 * @param {*} req 
 * @param {*} res 
 */
const delete_invoice = (req, res) => {
    const arr = req.body.id;

    // 使用mysql.escape来转义数组中的每个值
    const values = arr.map(id => mysql.escape(id)).join(',');
    const sql = `DELETE FROM invoices WHERE invoice_id IN (${values})`;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error('删除失败:', err);
            res.status(500).send('删除失败');
        } else {
            res.status(200).send('删除成功');
        }
    });
}


const add_invoice = (req, res) => {
    console.log(req.body);
    const { invoice_name, category_name, description, promo_image, invoice_status } = req.body
    const invoice_info = { invoice_name, category_name, description, promo_image, invoice_status }
    try {
        // 添加信息
        add_data(invoice_info, 'invoices')
            .then(result => res.status(result).send())
    }
    catch (err) {
        console.log("修改头像失败", err);
        res.status(500).send()
    }
}

module.exports = {
    invoice_details,
    invoice_list,
    add_invoice,
    update_invoice,
    delete_invoice
}
