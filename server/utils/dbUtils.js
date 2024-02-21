const conn = require('../models/db')
const mysql = require('mysql')

/**
 * 获取数据列表
 * @param {string} tableName 表名
 * @returns {Array} 结果集
 */
const get_data = tableName => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM ' + tableName
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

/**
 * 删除数据
 * @param {Array} dataArr 被删除的数据集
 * @param {String} tableName 表名
 * @param {String} field 字段名
 * @returns {Number} 结果
 */
const delete_data = (dataArr, tableName, field) => {
    return new Promise((resolve, reject) => {

        // 使用mysql.escape来转义数组中的每个值
        const values = dataArr.map(id => mysql.escape(id)).join(',');
        const sql = `DELETE FROM ${tableName} WHERE ${field} IN (${values})`;

        conn.query(sql, (err, result) => {
            if (err) {
                reject(err)
                resolve(500)
            } else {
                resolve(200)
            }
        });
    })
}

module.exports = {
    get_data, delete_data
}