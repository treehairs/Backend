const conn = require('../models/db')
const mysql = require('mysql')

const { get_data, delete_data } = require('../utils/dbUtils')

/**
 * 查询所有变体
 * @param {*} req 
 * @param {*} res 
 */
const variant_list = (req, res) => {
    get_data('product_variants')
        .then(result => {
            res.send({
                status: 200,
                data: result
            })
        })
}

/**
 * 删除变体
 * @param {*} req 
 * @param {*} res 
 */
const delete_variant = (req, res) => {
    const arr = req.body.id;
    delete_data(arr, 'product_variants', 'variant_id')
        .then(result => {
            res.send(result)
        })
}

module.exports = {
    variant_list,
    delete_variant
}