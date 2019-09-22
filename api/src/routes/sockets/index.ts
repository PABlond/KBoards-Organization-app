import connection from "./../../config/database"
import auth from "./../../services/auth"
import moment from "moment"

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

    socket.on(
      "createBoard",
      async ({
        title,
        description,
        columns,
      }: {
        title: string
        description: string
        columns: any
      }) => {
        const data = await connection
          .query(
            `INSERT INTO boards_list (userid, title, description, created_at, last_update, role) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              user.id,
              title,
              description,
              moment().unix(),
              moment().unix(),
              "CREATOR",
            ]
          )
          .catch((err: Error) => {
            console.log(err)
            throw err
          })

          for await (const column of columns) {
            await connection.query(
              `INSERT INTO boards_column (name, color, board_id) VALUES (?, ?, ?)`,
              [column.name, column.color, data.insertId]
            )
          }

          const boards = await connection.query(
            `SELECT * FROM boards_list WHERE userid = ? ORDER BY id DESC`,
            [user.id]
          )
          console.log(boards)
          socket.emit('boardsList', boards)
      }
    )

    socket.on('getColumns', async ({id}: {id: Number}) => {
      console.log('request columns')
      socket.emit('getColumns', await connection.query(
        `SELECT * FROM  boards_column WHERE board_id = ?`,
        [id]
      ))
    })

    socket.on("moveTo", async ({ id, to, name, description, colName }: any) => {
      await connection
        .query(`UPDATE board_tickets SET cat = ? WHERE id = ?`, [to, id])
        .catch((err: Error) => {
          console.log(err)
          socket.emit("error", err)
          throw err
        })
      socket.emit("moveTo", { name, description, to, colName })
    })

    socket.on(
      "deleteRow",
      async ({
        id,
        colName,
        name,
      }: {
        id: String
        colName: string
        name: string
      }) => {
        await connection.query(`DELETE FROM board_tickets WHERE id = ?`, [id])
        socket.emit("deleteRow", { colName, name })
      }
    )

    socket.on(
      "editRow",
      async ({
        id,
        name,
        description,
        i,
        colName,
      }: {
        id: string
        name: string
        description: string
        i: Number
        colName: string
      }) => {
        await connection.query(
          `UPDATE board_tickets SET name = ?, description = ? WHERE id = ?`,
          [name, description, id]
        )
        socket.emit("editRow", { i, name, description, colName })
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
        socket.emit("addRow", { name, description, column })
      }
    )
  })
