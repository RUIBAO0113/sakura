const jwt = require("jsonwebtoken")
const {
    JWT_SECRET
} = require('../config/config.default')
// 生成token
const generateToken = payload => {
    const token = "Bearer " + jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}
// 验证token
const verifyToken = token => {
    if (token.indexOf("Bearer") === -1) {
        return false
    }
    const tokens = token.split(" ")[1]
    let isSuccess = false
    jwt.verify(tokens, JWT_SECRET, (err, decoded) => {
        if (err) {
            isSuccess = false
        } else {
            isSuccess = true
        }
    })
    return isSuccess
}
module.exports = {
    generateToken,
    verifyToken
}