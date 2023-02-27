import Fs from 'fs'
import Path from 'path'
import Axios from 'axios'
import ufs from "url-file-size"
import http from "http"
import processes from "process"
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Math.round(Math.random() * 10000)
const server = http.createServer()

async function download(url) {
  const response = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })
  const path = Path.resolve(__dirname, Path.basename(url))
  response.data.pipe(Fs.createWriteStream(path))
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      console.log(`✅ Downloaded (${url})`)
      resolve()
    })
    response.data.on('error', () => {
      reject()
    })
  })
}

async function downloadImage(url) {
  const filePath = Path.join(__dirname, Path.basename(url))
  if(Fs.existsSync(filePath)) {
    const stats = Fs.statSync(filePath);
    const localSize = stats.size
    const remoteSize = await ufs(url)
    if (localSize !== remoteSize) await download(url)
  } else {
    await download(url)
  }
}

server.listen(PORT, async (err) => {
  // error checking
  if (err) console.error(err)
  else {
    process.argv.forEach(async (value, index) => {
      if (index === 2) {
        await downloadImage(value)
        processes.exit()
      }
    });
  }
})