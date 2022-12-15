const path = require('path')
const Koa = require('koa')
// 别名配置
require('module-alias/register')
// 视图
const views = require('koa-views')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
// 数据库
const seq = require('@db/seq')
try {
  seq.authenticate()
  console.log('Connection has been established successfully.')
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
const router = require('../router')
const app = new Koa()
app.use(defineGlobalData())
// 动态 ui引擎模板
app.use(views(path.join(__dirname, '../views'), {
  map: {
    html: 'ejs'
  }
}))
// 处理请求
app.use(
  KoaBody({
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
// 路由
app.use(router.routes()).use(router.allowedMethods())
// 统一的错误处理
app.on('error', errHandler)

module.exports = app