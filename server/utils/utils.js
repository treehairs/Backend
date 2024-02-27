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

module.exports = {
    add_quotes, ObjToStr
}