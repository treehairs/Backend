const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");

const conn = require('./models/db')

// 增加请求体大小的限制为50MB
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// 实例化multer，传递的参数对象，dest表示上传文件的存储路径
const upload = multer({ dest: '../public/upload/' })
app.use(upload.any()); //any表示任意类型的文件
// 将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面
app.use(express.static("../public"));

// 配置CORS中间件
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // 设置允许所有域名，或者设置为你的前端应用域名
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // 处理预检请求
    } else {
        next();
    }
});

// 引入请求解析体
app.use(express.urlencoded({ extended: true }))

const coupons = require('./routes/coupons')
app.use(coupons)

const user = require('./routes/user')
app.use(user)

const products = require('./routes/products')
app.use(products)

const variants = require('./routes/variants')
app.use(variants)

const categories = require('./routes/categories')
app.use(categories)

const upload_router = require('./routes/upload')
app.use(upload_router)

const test = require('./routes/test')
app.use(test)

app.listen('3000', () => {
    console.log("启动服务器成功！http://localhost:3000/");
})