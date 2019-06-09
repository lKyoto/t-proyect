const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000
const server = http.createServer(app)
const socketIO = require('socket.io')

server.listen(port)
console.log(`Server on ${port}`)

const io = socketIO(server)
console.log(`SocketIO listening`)

io.on('connection', () =>{
    console.log('New connection ')
})