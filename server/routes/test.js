const express = require('express')
const router = express.Router()
const conn = require('../models/db')

// 引入请求解析体，用于解析req.body
router.use(express.urlencoded({ extended: true }))

router.post("/avatar", function (req, res) {
    const image = req.body.image;
    const sql = "INSERT INTO avatar (avatar) VALUES (?)";

    conn.query(sql, [image], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }

        res.sendStatus(200);
    });
});

router.get('/avatar', function (req, res) {
    const sql = "select * from avatar"
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})


module.exports = router