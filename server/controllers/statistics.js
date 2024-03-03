const conn = require('../models/db')
const mysql = require('mysql')

const { get_data } = require('../utils/dbUtils')

const get_statistics = (req, res) => {
    const sql = "SELECT * FROM total_data"
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
}

const total_sales = (req, res) => {
    const sql = "SELECT * FROM annual_sales_revenue"
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
}

module.exports = {
    get_statistics,
    total_sales
}