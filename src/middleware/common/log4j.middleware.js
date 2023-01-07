let log4js = require('log4js');
let logConfig = require('../../../log4js.config');
const chalk = require('chalk')
// 加载配置文件
log4js.configure(logConfig);
let logUtil = {};
// 调用预先定义的日志名称
let resLogger = log4js.getLogger('resLogger');
let reqLogger = log4js.getLogger('http');
let errorLogger = log4js.getLogger('errorLogger');
let consoleLogger = log4js.getLogger();
// 格式化请求日志
let formatReqLog = function (req, resTime) {
    let logText = '';
    // 访问方法
    logText += chalk.rgb(164, 255, 242)('method: ') + chalk.rgb(187, 149, 247)(req.method) + '\n';
    // 请求原始地址
    logText += chalk.rgb(164, 255, 242)('originalUrl: ') + chalk.rgb(187, 149, 247)(req.originalUrl) + '\n';
    // 客户端ip
    logText += chalk.rgb(164, 255, 242)('client ip: ') + req.ip + '\n';
    // 开始时间
    // 请求参数
    if (req.method === 'GET') {
        logText += chalk.rgb(164, 255, 242)('query: ') + chalk.rgb(187, 149, 247)(JSON.stringify(req.query)) + '\n';
        // startTime = req.query.requestStartTime;
    } else {
        logText += chalk.rgb(164, 255, 242)('body: ') + '\n' + chalk.rgb(187, 149, 247)(JSON.stringify(req.body)) + '\n';
        // startTime = req.body.requestStartTime;
    }
    // 服务器响应时间
    logText += chalk.rgb(164, 255, 242)('request time: ') + resTime + '\n';
    return logText;
};
let formatInfo = function (info) {
    let logText = '';
    // 响应日志开始
    logText += '\n' + '***************info log start ***************' + '\n';
    // 响应内容
    logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
    // 响应日志结束
    logText += '*************** info log end ***************' + '\n';
    return logText;
};
// 格式化响应日志
let formatRes = function (ctx, resTime) {
    let logText = '';
    // 响应日志开始
    logText += '\n' + chalk.rgb(20, 250, 123)('***************  response log start  ***************') + '\n';
    // 添加请求日志
    logText += chalk.rgb(187, 149, 247)(formatReqLog(ctx.request, resTime));
    // 响应状态码
    logText += chalk.rgb(164, 255, 242)('response status: ') + chalk.rgb(187, 149, 247)(ctx.status) + '\n';
    // 响应内容
    logText += chalk.rgb(164, 255, 242)('response body: ') + '\n' + chalk.rgb(187, 149, 247)(JSON.stringify(ctx.body)) + '\n';
    // 响应日志结束
    logText += '\n' + chalk.rgb(20, 250, 123)('***************  response log start  ***************') + '\n';
    return logText;
};
// 格式化错误日志
let formatError = function (ctx, err, resTime) {
    let logText = '';
    // 错误信息开始
    logText += '\n' + '*************** error log start ***************' + '\n';
    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime);
    // 错误名称
    logText += 'err name: ' + err.name + '\n';
    // 错误信息../../../log4js.config
    logText += 'err message: ' + err.message + '\n';
    // 错误详情
    logText += 'err stack: ' + err.stack + '\n';
    // 错误信息结束
    logText += '*************** error log end ***************' + '\n';
    return logText;
};
// 封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};
// 封装请求日志
logUtil.reqLog = function (ctx, resTime) {
    if (ctx) {
        reqLogger.info(formatReqLog(ctx, resTime));
    }
};
// 封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};
logUtil.logInfo = function (info) {
    if (info) {
        consoleLogger.info(formatInfo(info));
    }
};
module.exports = async (ctx, next) => {
    ctx.logger = logUtil;
    ctx.logger.reqLog(ctx, 0);
    await next();
};