const { join, basename } = require('path')
const { assign } = Object

// reference:
// https://github.com/avajs/ava/blob/master/lib/cli.js

module.exports = {
  command: 'server [file]',
  description: 'start feathers http server',
  handler: argv => {
    const Log = require('../Log')
    const Db = require('../Db')
    const Server = require('../Server')

    const {
      cwd,
      file = './server.js'
    } = argv
    const name = basename(cwd)
    const dbConfigPath = join(cwd, 'db/index.js')
    const appPath = join(cwd, file)

    const dbConfig = require(dbConfigPath)
    const db = Db(dbConfig)

    const log = Log({ name })

    const App = require(appPath)
    const app = App({ db, log })

    const server = Server({ log, app })
    const close = server()
  }
}