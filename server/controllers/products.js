const conn = require('../models/db')
const mysql = require('mysql')

/**
 * 查询所有产品
 * @param {*} req 
 * @param {*} res 
 */
const product_list = (req, res) => {
    const sql = 'SELECT * FROM product_list'
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
    const sql = `SELECT * FROM product_details WHERE product_id=?`;

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


const addProduct = (req, res) => {

}

module.exports = {
    product_details,
    product_list,
    addProduct,
    update_product,
    delete_product
}