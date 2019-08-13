/**
 * 各种窗口创建
 * @author yutent<yutent@doui.cc>
 * @date 2019/01/26 18:28:22
 */

'use strict'

const { BrowserWindow } = require('electron')

/**
 * 应用主窗口
 */
exports.createMainWindow = function(icon) {
  // 创建浏览器窗口
  let win = new BrowserWindow({
    title: '钉钉-electron版',
    width: 1000,
    height: 602,
    resizable: false,
    // frame: false,
    icon,
    webPreferences: {
      webSecurity: false,
      experimentalFeatures: true,
      nodeIntegration: true
    },
    show: false
  })

  // 然后加载应用的 index.html。

  // win.loadURL('app://local/index.html')
  win.loadURL('https://im.dingtalk.com')

  win.on('ready-to-show', _ => {
    win.show()

    win.openDevTools()
  })

  win.webContents.on('dom-ready', ev => {
    win.webContents.executeJavaScript(
      `

      const shell = require('electron').shell;

      $(document).on('click', 'a[href^="http"]', function(event) {
          if(!this.hasAttribute('nwdirectory')){
            event.preventDefault();
            shell.openExternal(this.href);
          }
      });

      localStorage.setItem("isBeepOpen", "true");
      localStorage.setItem("notification", "true");
      localStorage.setItem("newUserState", "secTip");
      localStorage.setItem("latest_lang_info", "zh_CN");
      
      if(localStorage.getItem('fuck2')){

        sessionStorage.setItem('wk_device_id', localStorage.getItem('fuck1'))
        sessionStorage.setItem('wk_token', localStorage.getItem('fuck2'))
        
      }

      if(!sessionStorage.getItem('first_in')){
        sessionStorage.setItem('first_in', 1)
        location.reload()
      }
      
      `,
      true
    )
  })

  win.on('close', ev => {
    ev.preventDefault()
    win.webContents.executeJavaScript(
      `
        if(sessionStorage.getItem('wk_token')){

          localStorage.setItem('fuck1', sessionStorage.getItem('wk_device_id'))
          
          localStorage.setItem('fuck2', sessionStorage.getItem('wk_token'))
        }
      
      `,
      true
    )
    win.hide()
  })

  win.on('page-title-updated', ev => {
    ev.preventDefault()
  })

  return win
}
