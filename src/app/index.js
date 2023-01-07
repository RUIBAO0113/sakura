const path = require('path')
const Koa = require('koa')
const chalk = require('chalk')
// 别名配置
require('module-alias/register')
const log4js = require('@middleware/common/log4j.middleware')
// 视图
const views = require('koa-views')
// 控制台错误输出
const {
  payloadLog
} = require("@middleware/common/payloadLog.middleware")

// 服务请求处理
const {
  koaBody
} = require('koa-body')
const KoaStatic = require('koa-static')
// 数据库
const seq = require('@db/seq')
try {
  seq.authenticate()
  console.log(chalk.rgb(164, 255, 242)('[▸ DATABASE] has been established successfully.'))
} catch (error) {
  console.error('Unable to connect to the dataBase:', error)
}
const parameter = require('koa-parameter')
// 常见错误捕获
const errHandler = require('./errHandler')
// 处理跨域
const cors = require('@koa/cors')
// 定义全局变量
const defineGlobalData = require("@utils/defineGlobalData")
// 时间格式转换
const Moment = require("moment");

const router = require('../router')
const app = new Koa()
// 日志中间件;
app.use(log4js)
app.use(async (ctx, next) => {
  const start = new Date();
  let ms = new Date() - start;
  await next();
  try {
    // 开始进入到下一个中间件
    if (ctx.status === 404) {
      ctx.throw(404);
    }
    ms = new Date() - start;
    // 记录响应日志
    ctx.logger.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    // 记录异常日志
    ctx.logger.logError(ctx, error, ms);
  }
});
// 日志打印
app.use(payloadLog)
// 全局变量
app.use(defineGlobalData())
// 动态 ui引擎模板
app.use(views(path.join(__dirname, '../views'), {
  map: {
    html: 'ejs'
  }
}))
// 处理请求
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1000 * 1024 * 1024,
      // 在配制选项option里, 不推荐使用相对路径
      // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
      uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true,
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb',
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
  })
)
// 处理静态资源读取
app.use(KoaStatic(path.join(__dirname, '../upload')))
// 格式校验
app.use(parameter(app))
// 解决跨域
app.use(cors())
// 日志
// app.use(Koa_Logger((str) => { // 使用日志中间件
//   console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
// }))
// 路由
app.use(router.routes()).use(router.allowedMethods())
// 统一的错误处理
app.on('error', errHandler)

module.exports = app