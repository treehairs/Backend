// socket.js
const { Server } = require("socket.io")

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
        const username = socket.handshake.query.username

        if (!username) return

        const userInfo = userList.find(user => user.username === username)

        if (userInfo) {
            userInfo.id = socket.id
        }
        else {
            userList.push({
                id: socket.id,
                username
            })
        }

        // 用户连接服务器
        socket.emit('onLine', userList)

        // 用户发送消息
        socket.on("send", ({ fromUsername, targetUsername, msg }) => {
            const targetID = userList.find(user => user.username === targetUsername).id

            io.to(targetID).emit('receive', {
                fromUsername,
                targetUsername,
                msg,
                datetime: new Date().getTime()
            })
        });

        socket.on("disconnect", reason => {
            // if(reason !== "transport close") return
            // console.log(userList);
            // // 当用户刷新页面时，ID会更改。如果离开时的ID和现有的ID相匹配，则代表用户没有刷新页面，是真正的关闭聊天。
            const leave_user = userList.find(user => user.id === socket.id)
            // console.log(leave_user.username);
            // if (leave_user) {
            //     userList = userList.filter(user => user.id !== socket.id)
            //     socket.emit('leave', leave_user.username)
            //     console.log(`${leave_user.username}离开了`);
            // }
            if (leave_user) {
                io.emit('leaving', leave_user.username)
            }
            // return
        })

        return
    });
}

module.exports = {
    handleConnection
}
