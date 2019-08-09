/**
 * 托盘
 * @author yutent<yutent@doui.cc>
 * @date 2019/01/21 20:42:07
 */

'use strict'

const { app, Tray, Menu } = require('electron')
const path = require('path')
const ROOT = __dirname

module.exports = function(win) {
  app.__TRAY__ = new Tray(path.join(ROOT, '../images/tray.png'))
  let menuList = Menu.buildFromTemplate([
    {
      label: '显示主窗口',
      click() {
        win.show()
      }
    },
    { type: 'separator' },
    {
      label: '退出',
      click() {
        win.destroy()
      }
    }
  ])
  app.__TRAY__.on('click', _ => {
    win.show()
  })

  app.__TRAY__.setContextMenu(menuList)
}
