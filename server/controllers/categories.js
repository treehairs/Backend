const conn = require('../models/db')
const mysql = require('mysql')

/**
 * 查询所有类别
 * @param {*} req 
 * @param {*} res 
 */
const category_list = (req, res) => {
    const sql = 'SELECT * FROM categories'
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send({
            status: 200,
            data: result
        })
    })
}

/**
 * 删除商品
 * @param {*} req 
 * @param {*} res 
 */
const delete_category = (req, res) => {
    const arr = req.body.id;

    // 使用mysql.escape来转义数组中的每个值
    const values = arr.map(id => mysql.escape(id)).join(',');
    const sql = `DELETE FROM categories WHERE category_id IN (${values})`;

    conn.query(sql, (err, result) => {
        if (err) {
            console.error('删除失败:', err);
            res.status(500).send('删除失败');
        } else {
            res.status(200).send('删除成功');
        }
    });
}


module.exports = {
    category_list, delete_category
}