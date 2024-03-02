const conn = require('../models/db')
const mysql = require('mysql')

const { add_data } = require('../utils/dbUtils')

/**
 * 查询所有产品
 * @param {*} req 
 * @param {*} res 
 */
const order_list = (req, res) => {
    const sql = 'SELECT * FROM oms_order'
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send({
            status: 200,
            data: result
        })
    })
}

/**
 * 查询某个产品的详情信息
 * @param {*} req 
 * @param {*} res 
 */
const product_details = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM products WHERE product_id=?`;

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
const update_product = (req, res) => {
    const pid = req.params.id
    const { product_name, description, category_id, promo_image, product_status } = req.body
    const info = { product_name, description, category_id, promo_image, product_status }
    const sql = 'UPDATE products SET ? WHERE product_id=?'
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
const delete_product = (req, res) => {
    const arr = req.body.id;

    // 使用mysql.escape来转义数组中的每个值
    const values = arr.map(id => mysql.escape(id)).join(',');
    const sql = `DELETE FROM products WHERE product_id IN (${values})`;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error('删除失败:', err);
            res.status(500).send('删除失败');
        } else {
            res.status(200).send('删除成功');
        }
    });
}


const add_product = (req, res) => {
    console.log(req.body);
    const { product_name, category_name, description, promo_image, product_status } = req.body
    const product_info = { product_name, category_name, description, promo_image, product_status }
    try {
        // 添加信息
        add_data(product_info, 'products')
            .then(result => res.status(result).send())
    }
    catch (err) {
        console.log("修改头像失败", err);
        res.status(500).send()
    }
}

module.exports = {
    product_details,
    order_list,
    add_product,
    update_product,
    delete_product
}