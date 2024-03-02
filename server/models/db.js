const mysql = require('mysql');

// 创建数据库连接
const connection = mysql.createConnection({
    host: 'mysql.sqlpub.com',
    user: 'hlg_admin',
    password: 'ZIK6i3Plw4AClOCY',
    database: 'conveniencemart'
});

// 暴露文件
module.exports = connection;
