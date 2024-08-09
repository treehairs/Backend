// socket.js
const { Server } = require("socket.io");
const { add_data } = require("../utils/dbUtils");
const { formatDateTime } = require("../utils/utils");

// socket.io服务可以作为独立服务，也可以添加到一个已经存在的服务上(HTTP,Express,Koa,Nest)
const io = new Server(4000, {
    // ...配置项
    // path, parser, connectTimeout 等服务选项
    // wsEngine, cors 跨域配置, cookie, transports, allowRequest 用来决定是否接受请求，继续处理（做校验）等等 低引擎配置选项

    // 允许跨域
    cors: {
        origin: "*"
    }
    // cors: true
});

let userList = [], messageList = []

const handleConnection = () => {
    io.on("connection", (socket) => {

        // console.log(socket.id);
        // 获取登录用户名
        const username = socket.handshake.query.username
        if (!username) return

        // 验证用户是否第一次登录
        const userInfo = userList.find(user => user.username === username)
        if (userInfo)
            userInfo.id = socket.id
        else
            userList.push({
                id: socket.id,
                username
            })

        // 用户连接服务器
        socket.emit('onLine', userList)

        // 用户发送消息
        socket.on("send", ({ from_user, to_user, message }) => {
            // 验证目标用户是否离线
            if (!userList.find(item => item.username === to_user)) return

            // 获取目标用户ID
            const targetID = userList.find(user => user.username === to_user)?.id

            // 保存消息记录
            const message_recording = {
                from_user,
                to_user,
                message,
                send_time: formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss")
            }

            // 转发信息
            io.to(targetID).emit('receive', message_recording)

            // 存储记录
            messageList.push(message_recording)

        });

        // 用户离线
        socket.on("disconnect", reason => {
            userList = userList.filter(item => item.id !== socket.id)
        })
        return
    });
}

// 定时将聊天记录插入数据库
(() => {
    // 插入数据的时间间隔
    const interval = 1000 * 60 * 1 // 每 30 分钟执行一次

    // 执行函数
    const insert = () => {
        // 插入消息到数据库
        add_data(messageList, "message")
            .then(res => {
                // console.log("插入成功");
                messageList = []
            })
            .catch(err => {
                console.log("插入出错：" + err);
            })

        setTimeout(insert, interval)
    }

    insert()

})()

module.exports = {
    handleConnection
}
