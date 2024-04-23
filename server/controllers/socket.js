// socket.js
const { Server } = require("socket.io");
const { add_data } = require("../utils/dbUtils");

// socket.io服务可以作为独立服务，也可以添加到一个已经存在的服务上(HTTP,Express,Koa,Nest)
const io = new Server(4000, {
    // ...配置项
    // path, parser, connectTimeout 等服务选项
    // wsEngine, cors 跨域配置, cookie, transports, allowRequest 用来决定是否接受请求，继续处理（做校验）等等 低引擎配置选项

    // 允许跨域
    cors: true
});

let userList = []

const handleConnection = () => {
    io.on("connection", (socket) => {
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
        socket.on("send", ({ fromUser, toUser, message }) => {
            // 验证目标用户是否离线
            if (!userList.find(item => item.username === toUser)) {
                console.log("目标用户已离线");
                return
            }

            const targetID = userList.find(user => user.username === toUser)?.id
            io.to(targetID).emit('receive', {
                fromUser,
                toUser,
                message,
                datetime: new Date().getTime()
            })

            add_data([{ from_user: fromUser, to_user: toUser, message }, { from_user: fromUser, to_user: toUser, message }], "message")
                .then(res => { console.log("插入成功"); })
        });

        // 用户离线
        socket.on("disconnect", reason => {
            userList = userList.filter(item => item.id !== socket.id)
        })
        return
    });
}

module.exports = {
    handleConnection
}
