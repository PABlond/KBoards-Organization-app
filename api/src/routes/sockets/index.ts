import connection from "./../../config/database"
import auth from "./../../services/auth"
import boards from "./../../services/boards"

export default (io: any) =>
  io.on("connection", async (socket: any) => {
    const { token } = socket.handshake.query
    if (!token) {
      return socket.emit("notLogged")
    }
    const user = await auth
      .user({ token })
      .catch(err => socket.emit("notLogged"))
    const room = `kanban-${user.email}/${user.id}`
    socket.join(user.id)

    socket.on("moveTo", async ({ id, boardId, to }: any) => {
      await connection.query(`UPDATE board_tickets SET cat = ? WHERE id = ?`, [
        to,
        id,
      ])
      console.log('tickets')
    //   socket.broadcast
    //     .to(user.id)
    //     .emit("tickets", await boards.getTickets({ id: boardId }))
        socket.emit("tickets", await boards.getTickets({ id: boardId }))
    })
  })
