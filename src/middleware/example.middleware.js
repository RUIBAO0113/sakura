const {
    verifyToken
} = require('@utils/authorization')
const checkToken = async (ctx, next) => {
    const {
        authorization: token
    } = ctx.request.header
    if (!verifyToken(token)) {
        ctx.body = 'token error'
        return
    }
    await next()
}
module.exports = {
    checkToken
}