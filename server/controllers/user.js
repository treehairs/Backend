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

const shopping_cart = (req, res) => {
    const uid = req.params.uid
    const sql = "SELECT * FROM v_shopping_cart WHERE user_id=?"
    conn.query(sql, uid, (err, result) => {
        if (err) throw err
        res.status(200).send({
            data: result
        })
    })
}

const delete_goods = (req, res) => {
    const cid = +req.params.cid
    const sql1 = "SELECT * FROM shopping_cart WHERE cart_id=?"
    const sql2 = "DELETE FROM shopping_cart WHERE cart_id=?"
    // console.log(cid);
    conn.query(sql1, cid, (err, result) => {
        if (err) throw err
        if (!result.length) {
            res.status(404).send({
                msg: '未查询到该数据'
            })
            return
        }
        conn.query(sql2, cid, (err, result) => {
            if (err) throw err
            res.status(200).send()
        })
    })
}

const add_item_to_cart = (req, res) => {
    const { user_id, product_id, variant_id, quantity } = req.body
    const q_sql = "SELECT * FROM shopping_cart WHERE variant_id=?"
    conn.query(q_sql, +variant_id, (err, result) => {
        if (err) throw err
        if (result.length) {
            // 购物车有商品，修改商品数量
            const u_sql = "UPDATE shopping_cart SET quantity=? WHERE variant_id=?"
            conn.query(u_sql, [result[0].quantity + +quantity, variant_id], (err, result) => {
                if (err) throw err
                res.status(200).send()
            })
        } else {
            // 购物车没有商品，添加商品
            const i_sql = "INSERT INTO shopping_cart(user_id,product_id,variant_id,quantity) VALUES(?,?,?,?)"
            conn.query(i_sql, [+user_id, +product_id, +variant_id, +quantity], (err, result) => {
                if (err) throw err
                res.status(200).send()
            })
        }
    })
}

const get_address = (req, res) => {
    const uid = +req.params.uid
    const sql = "SELECT * FROM addresses WHERE user_id=?"
    conn.query(sql, uid, (err, result) => {
        if (err) throw err
        res.status(200).send({
            data: result
        })
    })
}

const delete_address = (req, res) => {
    const aid = +req.params.aid
    const q_sql = "SELECT * FROM addresses WHERE address_id=?"
    const d_sql = "DELETE FROM addresses WHERE address_id=?"
    // console.log(cid);
    conn.query(q_sql, aid, (err, result) => {
        if (err) throw err
        if (!result.length) {
            res.status(404).send({
                msg: '未查询到该数据'
            })
            return
        }
        conn.query(d_sql, aid, (err, result) => {
            if (err) throw err
            res.status(200).send()
        })
    })
}

module.exports = {
    wxLogin,
    shopping_cart,
    delete_goods,
    add_item_to_cart,
    get_address,
    delete_address
}