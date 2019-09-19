import app from './app'
import SocketIO from 'socket.io'
import socketRoutes from './routes/sockets'
require('@babel/polyfill')

const { PORT } = process.env
const server = app.listen(PORT)
const io: SocketIO.Server = SocketIO(server)
socketRoutes(io)
