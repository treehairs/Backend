const conn = require('../models/db')
const mysql = require('mysql')
const fs = require("fs")

/**
 * 查询所有产品
 * @param {*} req 
 * @param {*} res 
 */
const handleUploadEvent = (req, res) => {
    const { uid, pid } = req.params

    // 获取系统为文件起的名字
    const oldName = req.files[0].filename;
    // 获取上传时起的文件名
    const originalname = req.files[0].originalname;
    // 解决中文乱码
    const newName = Buffer.from(originalname, "latin1").toString("utf8");

    // 创建目录 /public/upload/uid/pid/ 如果不存在
    if (!fs.existsSync(`../public/upload/${uid}/${pid}`)) {
        fs.mkdirSync(`../public/upload/${uid}/${pid}`, { recursive: true });
    }
    // 改图片的名字
    fs.renameSync('../public/upload/' + oldName, `../public/upload/${uid}/${pid}/${newName}`);
    // // 这段insert操作可有可无
    // const sql = 'insert into ima set ? '
    // 为什么返回的图片少了/pubilc?因为是静态托管
    // db.query(sql,{image:`http://127.0.0.1:3007/upload/${newName}`},(err,result)=>{
    //     if (err) {
    //         return res.send(err)
    //     }
    //     // 上传成功
    //     res.send({
    //       err: 0,
    //       url:"http://127.0.0.1:3007/upload/" + newName
    //     });
    // })
    res.send({
        status:200,
        url:`/upload/${uid}/${pid}/${newName}`
    })
}

const wxUploadEvent = (req, res) => {
    const { uid } = req.params
    console.log(req);

    // 获取系统为文件起的名字
    const oldName = req.files[0].filename;
    // 获取上传时起的文件名
    const originalname = req.files[0].originalname;
    // 解决中文乱码
    const newName = Buffer.from(originalname, "latin1").toString("utf8");

    // 创建目录 /public/upload/uid/pid/ 如果不存在
    if (!fs.existsSync(`../public/upload/${uid}/${pid}`)) {
        fs.mkdirSync(`../public/upload/${uid}/${pid}`, { recursive: true });
    }
    // 改图片的名字
    fs.renameSync('../public/upload/' + oldName, `../public/upload/${uid}/${pid}/${newName}`);
    // // 这段insert操作可有可无
    // const sql = 'insert into ima set ? '
    // 为什么返回的图片少了/pubilc?因为是静态托管
    // db.query(sql,{image:`http://127.0.0.1:3007/upload/${newName}`},(err,result)=>{
    //     if (err) {
    //         return res.send(err)
    //     }
    //     // 上传成功
    //     res.send({
    //       err: 0,
    //       url:"http://127.0.0.1:3007/upload/" + newName
    //     });
    // })
    res.send({
        status:200,
        url:`/upload/${uid}/${pid}/${newName}`
    })
}


module.exports = {
    handleUploadEvent,
    wxUploadEvent
}