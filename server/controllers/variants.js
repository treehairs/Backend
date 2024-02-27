const conn = require('../models/db')
const mysql = require('mysql')

const { get_data, delete_data, add_data, update_data } = require('../utils/dbUtils')

/**
 * 查询所有变体
 * @param {*} req 
 * @param {*} res 
 */
const variant_list = (req, res) => {
    let condition = '';
    if (req.query.pid)
        condition = ` WHERE product_id=${req.query.pid}`
    get_data('product_variants', condition)
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

/**
 * 修改变体
 * @param {*} req 
 * @param {*} res 
 */
const update_variant = (req, res) => {
    const data = req.body;
    const vid = +req.params.vid
    const { variant_name, price, style, specs, stock_quantity, variant_image } = data
    const variant_info = { variant_name, price, style, specs, stock_quantity, variant_image }
    try {
        update_data(variant_info, 'product_variants', { variant_id: vid })
        // // 添加图片
        // await add_data(image_info, 'product_images')
        // // 添加信息
        // await add_data(variant_info, 'product_variants')
        // res.status(200).send()
    }
    catch (err) {
        console.log("修改头像失败", err);
        res.status(500).send()
    }
}

/**
 * 添加变体
 * @param {*} req 
 * @param {*} res 
 */
const add_variant = (req, res) => {
    const data = req.body;
    const vid = req.params.vid
    const image_info = { variant_id: +vid, image: data.image }
    const { product_id, variant_name, price, style, specs, stock_quantity } = data
    const variant_info = { product_id, variant_name, price, style, specs, stock_quantity }
    try {
        // 添加图片
        add_data(image_info, 'product_images')
        // 添加信息
        add_data(variant_info, 'product_variants')
        res.status(200).send()
    }
    catch (err) {
        console.log("修改头像失败", err);
        res.status(500).send()
    }
}

module.exports = {
    variant_list,
    delete_variant,
    add_variant,
    update_variant
}