const conn = require('../models/db')
const mysql = require('mysql')
const { add_quotes, ObjToStr } = require('../utils/utils')

/**
 * 获取数据列表
 * @param {string} tableName 表名
 * @param {string} condition 条件 - 可选
 * @returns {Array} 结果集
 */
const get_data = (tableName, condition = '') => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM ' + tableName + condition
        conn.query(sql, (err, result) => {
            if (err) reject(err)
            console.log(result[0]);
            resolve(result[0])
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

/**
 * 添加数据
 * @param {Array} data 数据集
 * @param {String} tableName 表名
 * @returns {Number} 结果
 */
const add_data = (data, tableName) => {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(data)
        const values = add_quotes(Object.values(data))
        const sql = `INSERT INTO ${tableName}(${keys}) VALUES(${values})`;
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

/**
 * 修改数据
 * @param {object} data 新数据集
 * @param {string} tableName 目标表名
 * @param {object} obj 目标数据的键值
 * @returns 
 */
const update_data = (data, tableName, obj) => {
    return new Promise((resolve, reject) => {
        const values = ObjToStr(data)
        const condition = ObjToStr(obj)
        const sql = `UPDATE ${tableName} SET ${values} WHERE ${condition}`;
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
    get_data, delete_data, add_data, update_data
}