const fs = require('fs')
const path = require('path')


/**
 * 给数组元素添加引号
 * @param {Array} array 目标数组
 * @returns 
 */
const add_quotes = (array) => {
    for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === "number") continue
        array[i] = `"${array[i]}"`
    }
    return array
}

/**
 * 将对象的键值转换为字符串并添加等于号
 * @param {object} obj 待转换对象
 * @returns {Array}
 */
const ObjToStr = (obj) => {
    const keys = Object.keys(obj)
    const arr = []
    for (const key of keys) {
        let value = obj[key]
        if (typeof value !== "number") {
            value = `'${value}'`
        }
        arr.push(`${key}=${value}`)
    }
    return arr
}

/**
 * 日期格式化
 * @param {Date} date - Date格式日期
 * @param {String} format - 格式字符串
 * @returns {String} 格式化后的日期字符串
 */
function formatDateTime(date, format) {
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
        a: date.getHours() < 12 ? '上午' : '下午', // 上午/下午
        A: date.getHours() < 12 ? 'AM' : 'PM', // AM/PM
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }
    return format;
}

/**
 * 异步读取文件
 * @param {string} file_path 读取文件路径
 * @returns {Promise<string>} 文件内容的Promise对象
 */
const read_file = (file_path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, file_path), 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};



module.exports = {
    add_quotes, ObjToStr, formatDateTime, read_file
}