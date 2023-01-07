const {
    emptyParamsError
} = require('@constant/err.type')
const emptyParamsCheck = (keyList) => {
    return async function (ctx, next) {
        let isHasEmpty = false
        if (ctx.method === "GET") {
            keyList.forEach(key => {
                if (!Object.prototype.hasOwnProperty.call(ctx.query, key)) {
                    isHasEmpty = true
                }
            });
        } else if (ctx.method === "POST") {
            keyList.forEach(key => {
                if (!Object.prototype.hasOwnProperty.call(ctx.body, key)) {
                    isHasEmpty = true
                }
            });
        }
        if (isHasEmpty) {
            ctx.body = emptyParamsError
            return
        }
        await next()
    }
}
module.exports = {
    emptyParamsCheck
}