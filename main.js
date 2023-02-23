const { app, BrowserWindow, globalShortcut } = require("electron")
const fs = require("fs")

const createWindow = () => {
  const win = new BrowserWindow({
    width: 200,
    // resizable: false,
    height: 100,
    frame: false,
    transparent: true,
  })
  win.setAlwaysOnTop(true)
  win.loadFile("index.html")
}

app.whenReady().then(() => {
  createWindow()
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})

// app.whenReady().then(() => {
//   globalShortcut.register("Esc", () => {
//     app.exit()
//   })
// })

const logTarget =
  "../../SteamLibrary/steamapps/common/Path of Exile/logs/Client.txt"

const fd = fs.openSync(logTarget, "r+")

let { size: lastSize, size: currentSize } = fs.fstatSync(fd)
setInterval(() => {
  fs.fdatasyncSync(fd)
  const { size } = fs.fstatSync(fd)
  ;[lastSize, currentSize] = [currentSize, size]
  if (currentSize > lastSize) {
    const dSize = currentSize - lastSize
    const buf = Buffer.alloc(dSize)
    fs.readSync(fd, buf, 0, dSize, lastSize)
    console.dir(buf.toString())
  }
}, 300)
