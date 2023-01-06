const MUser = require("@model/example.model")
const User = require("../model/example.model")
class ExampleService {
    // 创建用户
    async SUserSignUp(ctx, {
        name,
        tel,
        sex,
        birthDate
    }) {
        try {
            const res = await MUser.findOne({
                where: {
                    user_name: name,
                    user_tel: tel,
                    user_sex: sex
                }
            })
            if (!res) {
                await MUser.create({
                    user_name: name,
                    user_tel: tel,
                    user_sex: sex,
                    user_birth_date: birthDate
                })
                ctx.body = {
                    code: 200,
                    message: 'successful',
                    data: null
                }
            } else {
                // 重复
                ctx.body = '重复用户'
            }
        } catch (err) {
            ctx.body = ctx.state.serverError
        }
    }
    // 获取用户信息
    async SGetUserInfo(ctx, {
        id
    }) {
        try {
            const res = await User.findOne({
                where: {
                    user_id: id
                }
            })
            if (res && res.dataValues) {
                const {
                    user_id,
                    user_name,
                    user_tel,
                    user_sex,
                    user_birth_date
                } = res.dataValues
                ctx.body = {
                    code: 200,
                    message: 'successful',
                    data: {
                        id: user_id,
                        name: user_name,
                        sex: user_sex,
                        birthDate: user_birth_date,
                    }
                }
            } else {
                ctx.body = '未找到该用户'
            }
        } catch (err) {
            ctx.body = ctx.state.serverError
        }
    }
}
module.exports = new ExampleService()