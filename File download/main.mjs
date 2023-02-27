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
const url = 'https://static.videezy.com/system/resources/previews/000/000/161/original/Volume2.mp4'

async function download() {
  const path = Path.resolve(__dirname, `_${Path.extname(url)}`)
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
  try {
    const stats = Fs.statSync(`./_${Path.extname(url)}`);
    const localSize = stats.size
    const remoteSize = await ufs(url)
    if(localSize !== remoteSize) await download()
    else console.log("❌ Same file exists")
  } catch(e) { await download() }
}

server.listen(PORT, async (err) => {
  // error checking
  if(err) console.error(err)
  else {
    await downloadImage()
    exit()
  }
})