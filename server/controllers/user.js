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

const add_address = (req, res) => {
    console.log("添加");
    const { uid, name, telephone, city, street_address } = req.body
    const i_sql = "INSERT INTO addresses(user_id,recipient_name,city,street_address,telephone) VALUES(?,?,?,?,?)"
    conn.query(i_sql, [uid, name, city, street_address, telephone], (err, result) => {
        if (err) throw err
        res.status(200).send()
    })
}

const update_address = (req, res) => {
    const aid = +req.params.aid
    const { uid, name, telephone, city, street_address } = req.body
    const i_sql = "UPDATE addresses SET user_id=?,recipient_name=?,telephone=?,city=?,street_address=? WHERE address_id=?"
    conn.query(i_sql, [uid, name, telephone, city, street_address, aid], (err, result) => {
        if (err) throw err
        res.status(200).send()
    })
}

const get_orders = (req, res) => {
    const uid = +req.params.uid
    const s_t_sql = "SELECT * FROM orders WHERE user_id=?"
    conn.query(s_t_sql, uid, (err, t_orders) => {
        if (err) throw err
        const s_v_sql = "SELECT * FROM v_order_item WHERE user_id=?"
        conn.query(s_v_sql, uid, (err, v_order_item) => {
            if (err) throw err
            res.status(200).send({
                orders: t_orders,
                order_item: v_order_item
            })
        })
    })
}

const add_orders = (req, res) => {
    const { user_id, total_amount, tel, address, recipient_name, items } = req.body;

    const i_order = "INSERT INTO orders(user_id, total_amount, order_status, tel, address, recipient_name) VALUES (?, ?, '待发货', ?, ?, ?)";
    conn.query(i_order, [user_id, total_amount, tel, address, recipient_name], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error inserting order");
        }

        const order_id = result.insertId; // Get the ID of the inserted order

        // Insert each item related to the order
        const i_order_item = "INSERT INTO order_item(order_id, variant_id, quantity, total_price) VALUES (?, ?, ?, ?)";
        items.forEach(item => {
            const { variant_id, quantity, price } = item;
            conn.query(i_order_item, [order_id, variant_id, quantity, quantity * price], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error inserting order items");
                }
            });
        });

        return res.status(200).send("Order and items inserted successfully");
    });
}

const done_order = (req, res) => {
    const oid = +req.params.oid
    const sql = "UPDATE orders SET order_status='已完成' WHERE order_id=?"
    conn.query(sql, oid, (err, result) => {
        if (err) throw err
        res.status(200).send()
    })
}

const delete_order = (req, res) => {
    const oid = +req.params.oid
    const sql = "DELETE FROM orders WHERE order_id=?"
    conn.query(sql, oid, (err, result) => {
        if (err) throw err
        res.status(200).send()
    })
}

module.exports = {
    wxLogin,
    shopping_cart,
    delete_goods,
    add_item_to_cart,
    get_address,
    delete_address,
    add_address,
    update_address,
    get_orders,
    add_orders,
    done_order,
    delete_order
}