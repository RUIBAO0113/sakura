const fs = require('fs')
const Router = require('koa-router')
const router = new Router()
fs.readdirSync(__dirname).forEach(path => {
    if (path !== 'index.js') {
        const ctx = require(`./${path}`)
        router.use(ctx.routes())
    }
})
module.exports = router