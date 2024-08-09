const conn = require('../models/db')
const mysql = require('mysql')
const { add_quotes, ObjToStr } = require('../utils/utils')

/**
 * 获取数据列表
 * @param {string} tableName 表名
 * @param {string} condition 条件 - 可选
 * @returns {Promise<array>} 返回一个 Promise 对象，成功时返回 200，失败时返回 500
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
 * @returns {Promise<number>} 返回一个 Promise 对象，成功时返回 200，失败时返回 500
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
 * @param {Array} dataList - 数据集数组
 * @param {String} tableName - 表名
 * @returns {Promise<number>} 返回一个 Promise 对象，成功时返回 200，失败时返回 500
 */
const add_data = (dataList, tableName) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(dataList) || dataList.length === 0) {
            // reject(new Error('数据集不能为空'));
            return
        } else {
            const keys = Object.keys(dataList[0]); // 使用第一个数据对象的键作为列名
            const values = dataList.map(data => '(' + add_quotes(Object.values(data)).join(', ') + ')'); // 构建值部分数组
            const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES ${values.join(', ')}`; // 构建 SQL 语句

            // console.log(sql);
            conn.query(sql, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(200);
                }
            });
        }
    });
};


/**
 * 修改数据
 * @param {object} data 新数据集
 * @param {string} tableName 目标表名
 * @param {object} obj 目标数据的键值
 * @returns {Promise<number>} 返回一个 Promise 对象，成功时返回 200，失败时返回 500 
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