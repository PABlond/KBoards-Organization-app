import connection from './../../config/database'
import auth from './../../services/auth'

export default (io: any) =>
    io.on('connection', async (socket: any) => {
        const { token } = socket.handshake.query
        if (!token) {
            return socket.emit('notLogged')
        }
        const user = await auth
            .user({ token })
            .catch(err => socket.emit('notLogged'))
        const room = `kanban-${user.email}/${user.id}`
        socket.join(user.id)

        
    })
