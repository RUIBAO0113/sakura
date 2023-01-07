const chalk = require('chalk')
const error = chalk.bold.red; // error
const warn = chalk.italic.yellow // waring
const success = chalk.dim.green // success
const log = console.log
const payloadLog = async (ctx, next) => {
    if (!ctx['log']) {
        ctx.log = {}
    }
    ctx.log.error = (content) => {
        log(error(content))
    }
    ctx.log.warn = (content) => {
        log(warn(content))
    }
    ctx.log.success = (content) => {
        log(success(content))
    }
    await next()
}
module.exports = {
    payloadLog
}