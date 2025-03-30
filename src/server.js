import http from 'node:http'

const server = http.createServer((req, res) => {
    res.end("server running")
})  

server.listen(3333)