const conn = require('../models/db')

const wxLogin = (req, res) => {
    const { username, password } = req.body

    const sql = 'select * from users where username=? and password=?'
    conn.query(sql, [username, password], (err, results) => {
        if (err) throw err
        else {
            if (results.length !== 0) {
                res.send({
                    status: 200,
                    userInfo: results
                })
            }
            else {
                res.send({
                    status: 201
                })
            }
        }
    })
}

module.exports = {
    wxLogin
}