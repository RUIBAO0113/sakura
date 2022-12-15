const Router = require('koa-router')
const router = new Router({
    // 路由前缀
    prefix: '/example'
})
// 默认路由 
router.get('/', async (ctx) => {
    ctx.body = {
        code: 200,
        message: 'Success',
        data: null
    }
})
// get query /query?id=2&&num=3&&name='xl'
router.get('/query', ctx => {
    // ctx.query => {id:2,num:3,name:'xl'}
    ctx.body = {
        code: 200,
        message: 'query',
        data: null
    }
})
// post json
router.post('/post', ctx => {
    // ctx.request.body => {id:2,num:3,name:'xl'}
    ctx.body = {
        code: 200,
        message: 'post',
        data: null
    }
})
module.exports = router