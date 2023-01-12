const {
    getIPAddress
} = require("./getIPAddress")
const chalk = require('chalk')
const serviceConsole = (APP_PORT) => {
    console.log(chalk.rgb(20, 250, 123)(`                                       `))
    console.log(chalk.rgb(187, 149, 247)(`api @ v1.1.0                      `))
    console.log(chalk.rgb(20, 250, 123)(`                                       `))
    console.log(`Listening:`, chalk.rgb(20, 250, 123)(`http://localhost:${APP_PORT}`))

    const IPv4 = getIPAddress()
    if (IPv4 === '127.0.0.1') {
        console.log(chalk.rgb(20, 250, 123)(`IPV4:`), chalk.rgb(20, 250, 123)(`http://${IPv4}:${APP_PORT}`))
        console.log(chalk.rgb(20, 250, 123)(`                                       `))
    } else {
        console.log(`IPV4:`, chalk.rgb(20, 250, 123)(`http://${IPv4}:${APP_PORT}`))
        console.log(chalk.rgb(20, 250, 123)(`                                       `))
    }
}
module.exports = serviceConsole