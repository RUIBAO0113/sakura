const {
    getIPAddress
} = require("./getIPAddress")
const chalk = require('chalk')
const serviceConsole = (APP_PORT) => {
    console.log(chalk.rgb(20, 250, 123)(`╭───────────────────────────────────────╮`))
    console.log(chalk.rgb(20, 250, 123)(`│                                       │`))
    console.log(chalk.rgb(20, 250, 123)(`│     api @ v1.1.0                      │`))
    console.log(chalk.rgb(20, 250, 123)(`│                                       │`))
    console.log(chalk.rgb(20, 250, 123)(`│`), `Listening:`, chalk.rgb(187, 149, 247)(`http://localhost:${APP_PORT}`), chalk.rgb(20, 250, 123)(`     │`))
    console.log(chalk.rgb(20, 250, 123)(`│`), `IPV4:`, chalk.rgb(187, 149, 247)(`http://${getIPAddress()}:${APP_PORT}`), chalk.rgb(20, 250, 123)(`     │`))
    console.log(chalk.rgb(20, 250, 123)(`╰───────────────────────────────────────╯`))
}
module.exports = serviceConsole