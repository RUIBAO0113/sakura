const serviceConsole = require("./utils/serviceConsole")
const {
  APP_PORT
} = require('./config/config.default')
const app = require('./app')
app.listen(APP_PORT, serviceConsole(APP_PORT))