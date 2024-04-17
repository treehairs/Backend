// loggerMiddleware.js
// const Log = require('../models/log');

const loggerMiddleware = async (req, res, next) => {
    // try {
    //     const logData = {
    //         method: req.method,
    //         path: req.path,
    //         params: req.params,
    //         query: req.query,
    //         body: req.body,
    //         timestamp: Date.now()
    //     };

    //     // 在数据库中记录日志
    //     await Log.create(logData);

    //     next();
    // } catch (error) {
    //     console.error('Error logging request:', error);
    //     next(error);
    // }
    if (req.method === "GET") {
        next()
    }
    else {
        console.log(req);

    }
};

module.exports = loggerMiddleware;
