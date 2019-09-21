import connection from "./../../config/database"
import auth from "./../../services/auth"
import moment from 'moment'

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

    socket.on("moveTo", async ({ id, to, name, description, colName }: any) => {
      await connection.query(`UPDATE board_tickets SET cat = ? WHERE id = ?`, [
        to,
        id,
      ]).catch((err: Error) => {
          console.log(err)
          socket.emit('error', err)
          throw err
      })
      socket.emit('moveTo', {name, description, to, colName})
    })

    socket.on(
      "deleteRow",
      async ({
        id,
        colName, 
        name
      }: {
        id: String
        colName: string
        name: string
      }) => {
        await connection.query(`DELETE FROM board_tickets WHERE id = ?`, [id])
        socket.emit('deleteRow', {colName, name})
      }
    )

    socket.on(
      "addRow",
      async ({
        name,
        boardId,
        description,
        column,
      }: {
        name: String
        boardId: string
        description: String
        column: String
      }) => {
        await connection
          .query(
            `INSERT INTO board_tickets (board_id, name, description, created_by, created_at, cat) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              parseInt(boardId),
              name,
              description,
              user.id,
              moment().unix(),
              column,
            ]
          )
          .catch((err: Error) => console.log(err))
          socket.emit('addRow', {name, description, column})
      }
    )
  })
