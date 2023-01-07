const globalData = require('@globalData')
const defineGlobalData = () => {
    return async (ctx, next) => {
        for (const key in globalData) {
            ctx.state[key] = globalData[key]
        }
        await next()
    }
}
module.exports = defineGlobalData