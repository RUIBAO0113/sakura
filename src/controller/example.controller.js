const {
    SUserSignUp,
    SGetUserInfo
} = require("@service/example.service")
class ExampleController {
    // 注册
    async CSignUp(ctx) {
        try {
            const {
                name,
                tel,
                sex
            } = ctx.request.body
            const birthDate = new Date().getTime()
            // service 层
            await SUserSignUp(ctx, {
                name,
                tel,
                sex,
                birthDate
            })
        } catch (err) {
            ctx.app.emit('err', ctx.state.serverError)
        }
    }
    // 获取用户信息
    async CGetUserInfo(ctx) {
        try {
            const {
                id
            } = ctx.request.body
            // service 层
            await SGetUserInfo(ctx, {
                id
            })
        } catch (err) {
            ctx.app.emit('err', ctx.state.serverError)
        }
    }
}
module.exports = new ExampleController()