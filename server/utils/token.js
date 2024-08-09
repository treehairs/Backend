const crypto = require('crypto')
const path = require('path')
const jwt = require('jsonwebtoken');
const fs = require('fs')
const { read_file } = require('./utils');

// 生成一个随机的密钥
const generateKey = () => {
    return crypto.randomBytes(32).toString('hex'); // 生成一个32字节的随机密钥并转换为十六进制格式
};

// 生成密钥并写入private.key文件
const generateSecretKey = () => {
    const key = generateKey();
    const filePath = path.join(__dirname, '../../private.key'); // 构建private.key文件的路径
    fs.writeFile(filePath, key, (err) => {
        if (err) {
            console.error('写入文件失败:', err);
        } else {
            // console.log('密钥已保存到private.key文件中');
        }
    });
};

// 验证token有效性
const verifyToken = (authorization) => {
    const tokenParts = authorization.split(' ');

    // 验证token
    return read_file('../../private.key')
        .then(data => {
            return jwt.verify(tokenParts[1], data);
        })
        .catch(err => {
            // console.error(err);
            throw err;
        });
}

module.exports = {
    generateSecretKey, verifyToken
}