const path = require('path');
const loggerType = process.env.NODE_ENV = 'development' ? 'console' : 'dateFile'
module.exports = {
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
  // 日志格式等设置
  appenders: {
    console: {
      type: 'console'
    },
    errorLogger: {
      type: loggerType,
      filename: path.resolve(__dirname, './logs/error/error'),
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 1000,
      numBackups: 3,
      path: '/error',
      layout: {
        type: 'basic'
      }
    },
    http: {
      type: loggerType,
      filename: path.resolve(__dirname, './logs/request/request'),
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 1000,
      numBackups: 3,
      path: '/request',
      layout: {
        type: 'basic' // 'messagePassThrough'
      }
    },
    resLogger: {
      type: loggerType,
      filename: path.resolve(__dirname, './logs/response/response'),
      pattern: '-yyyy-MM-dd-hh.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      maxLogSize: 1000,
      numBackups: 3,
      path: '/response',
      layout: {
        type: 'basic'
      }
    }
  },
  // 供外部调用的名称和对应设置定义
  categories: {
    default: {
      appenders: ['console'],
      level: 'all'
    },
    resLogger: {
      appenders: ['resLogger'],
      level: 'info'
    },
    errorLogger: {
      appenders: ['errorLogger'],
      level: 'error'
    },
    http: {
      appenders: ['http'],
      level: 'info'
    }
  },
  baseLogPath: path.resolve(__dirname, './logs'),
  replaceConsole: false
};