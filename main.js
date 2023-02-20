const { app, BrowserWindow, globalShortcut } = require("electron")
// const fs = require("fs/promises")
// const { Tail } = require("tail")
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

const logTxt =
  "../../SteamLibrary/steamapps/common/Path of Exile/logs/Client.txt"
let logSize = 0

function checkLog() {
  fs.stat(logTxt, (err, stats) => {
    if (err) {
      console.error(err)
      return
    }
    if (logSize < stats.size) {
      logSize = stats.size
      console.log(logSize)
    }
  })
}

const readStream = async () => {
  const stream = fs.createReadStream(logTxt, "utf-8")
  for await (const chunk of stream) {
    console.log(chunk)
  }
  const data = await fs.promises.readFile(logTxt, "utf-8")
  console.log(data)
}

readStream()

setInterval(checkLog, 2000)

// app.whenReady().then(() => {
//   globalShortcut.register("Esc", () => {
//     app.exit()
//   })
// })

// const filename =
//   "../../SteamLibrary/steamapps/common/Path of Exile/logs/Client.txt"
// const time = new Date()

// function updateFile() {
//   fs.utimes(filename, time, time).catch(function (err) {
//     if ("ENOENT" !== err.code) {
//       throw err
//     }

//     let fh = fs.open(filename, "a")
//     fh.close()
//   })
// }

// setInterval(updateFile, 100)

// const tail = new Tail(
//   "../../SteamLibrary/steamapps/common/Path of Exile/logs/Client.txt"
// )

// tail.on("line", function (data) {
//   console.log(data)
// })

// tail.on("error", function (error) {
//   console.log("ERROR: ", error)
// })
