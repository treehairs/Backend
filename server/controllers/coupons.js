const conn = require('../models/db')

const coupons = (req, res) => {
    const uid = req.params.uid
    const sql = "select * from coupons where user_id=?"
    conn.query(sql, uid, (err, results) => {
        if (err) throw err
        res.send({
            status: 200,
            data: { results }
        })
    })
}

module.exports = {
    coupons
}