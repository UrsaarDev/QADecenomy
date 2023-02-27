const http = require("http")
const { exit } = require("process")
const PORT = process.env.PORT || 4000
const server = http.createServer()
const Messager = require("./Messager")

server.listen(PORT, async (err) => {
  // error checking
  if(err) console.error(err)
  else {
    const msgInstance = new Messager();
    console.log(await msgInstance.msg())
    exit()
  }
})