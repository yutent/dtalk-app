/* app */
const { app, session, Menu } = require('electron')
const path = require('path')

const log = console.log

const createTray = require('./tools/tray')
const { createMainWindow } = require('./tools/windows')

const ROOT = __dirname

/* ----------------------------------------------------- */

app.commandLine.appendSwitch('lang', 'zh-CN')
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required')

Menu.setApplicationMenu(null)

/* ----------------------------------------------------- */

//  初始化应用
app.once('ready', () => {
  // 修改app的UA
  session.defaultSession.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
  )

  let win = createMainWindow(path.join(ROOT, './images/app.png'))

  createTray(win)
})
