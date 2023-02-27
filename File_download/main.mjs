import Fs from 'fs'
import Path from 'path'
import Axios from 'axios'
import ufs from "url-file-size"
import http from "http"
import { exit } from "process"
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000
const server = http.createServer()
const url = 'https://www.holochain.org/img/big_logo-2x.webp'
const path = Path.resolve(__dirname, Path.basename(url))

async function download() {
  const response = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })
  response.data.pipe(Fs.createWriteStream(path))
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      console.log("✅ Download completed")
      resolve()
    })
    response.data.on('error', () => {
      reject()
    })
  })
}

async function downloadImage () {
  if(Fs.existsSync(Path.basename(url))) {
    const stats = Fs.statSync(`./${Path.basename(url)}`);
    const localSize = stats.size
    const remoteSize = await ufs(url)
    if(localSize !== remoteSize) await download()
    else console.log("❌ Already up to date")
  } else {
    await download()
  }
}

server.listen(PORT, async (err) => {
  // error checking
  if(err) console.error(err)
  else {
    await downloadImage()
    exit()
  }
})