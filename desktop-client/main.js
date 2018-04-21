const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu

const path = require('path')
const url = require('url')
const storage = require('electron-json-storage')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    minWidth: 300,
    minHeight: 200,
    backgroundColor: '#333',
    icon: path.join(__dirname, 'assets/icon.png'),
    title: 'yamot',
    darkTheme: true,
    show: false
  })
  mainWindow.storage = storage

  Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: 'View',
    submenu: [{ role: 'togglefullscreen', accelerator: 'F11' }]
  }, {
    role: 'window',
    submenu: [{ role: 'minimize' }, { accelerator: 'CmdOrCtrl+Q', role: 'close' }]
  }]))
  mainWindow.setAutoHideMenuBar(true)
  mainWindow.setMenuBarVisibility(false)

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.maximize()
  mainWindow.show()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('activate', function () {
  if (mainWindow === null)
    createWindow()
})
