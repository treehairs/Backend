const conn = require('../models/db')
const mysql = require('mysql')

const { add_data } = require('../utils/dbUtils')

/**
 * 查询所有产品
 * @param {*} req 
 * @param {*} res 
 */
const login = (req, res) => {
    const { username, password } = req.body
    const sql = 'SELECT * FROM admins WHERE username=? AND password=?'
    conn.query(sql, [username, password], (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            res.status(200).send()
        }
        else {
            res.status(201).send()
        }
    })
}


module.exports = {
    login
}