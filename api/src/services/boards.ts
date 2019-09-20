import auth from "./auth"
import connection from "./../config/database"
import moment from "moment"

const getBoardsList = async (id: string) => {
  return await connection.query(
    `SELECT * FROM boards_list WHERE userid = ? ORDER BY id DESC`,
    [id]
  )
}

const getBoards = async ({ token }: { token: string }) => {
  const user = await auth.user({ token })
  const boardsList = await getBoardsList(user.id)
  console.log("boardsList", boardsList)

  return boardsList
}

const createBoard = async ({
  token,
  title,
  description,
}: {
  token: string
  title: string
  description: string
}) => {
  const user = await auth.user({ token })
  await connection
    .query(
      `INSERT INTO boards_list (userid, title, description, created_at, last_update, role) VALUES (?, ?, ?, ?, ?, ?)`,
      [user.id, title, description, moment().unix(), moment().unix(), "CREATOR"]
    )
    .catch(err => {
      console.log(err)
      throw err
    })
  console.log(await getBoardsList(user.id))
  return await getBoardsList(user.id)
}

const getTickets = async ({ id }: { id: String }) => {
  return await connection.query(
    `SELECT * FROM board_tickets WHERE board_id = ?`,
    [id]
  )
}

const getBoardTickets = async ({
  token,
  id,
}: {
  token: String
  id: String
}) => {
  const user = await auth.user({ token })
  if (user.id) {
    const tickets = await getTickets({ id })
    return tickets
  }
}

const deleteRow = async ({
  token,
  id,
  boardId,
}: {
  token: string
  id: String
  boardId: String
}) => {
  const user = await auth.user({ token })
  if (user.id) {
    await connection.query(`DELETE FROM board_tickets WHERE id = ?`, [id])
    console.log({
      token,
      id,
      boardId,
    })
    const tickets = await getTickets({ id: boardId })
    return tickets
  }
}

const moveTo = async ({
  token,
  id,
  boardId,
  to,
}: {
  token: string
  id: String
  boardId: String
  to: String
}) => {
  const user = await auth.user({ token })
  if (user.id) {
    await connection.query(`UPDATE board_tickets SET cat = ? WHERE id = ?`, [
      to,
      id,
    ])

    const tickets = await getTickets({ id: boardId })
    return tickets
  }
}

const addRow = async ({
  token,
  name,
  boardId,
  description,
  column,
}: {
  token: string
  name: String
  boardId: string
  description: String
  column: String
}) => {
  const user = await auth.user({ token })
  await connection
    .query(
      `INSERT INTO board_tickets (board_id, name, description, created_by, created_at, cat) VALUES (?, ?, ?, ?, ?, ?)`,
      [parseInt(boardId), name, description, user.id, moment().unix(), column]
    )
    .catch((err: Error) => console.log(err))
  return await getTickets({ id: boardId })
}

const editRow = async ({
  token,
  id,
  boardId,
  name,
  description,
}: {
  token: string
  id: String
  boardId: String
  name: String
  description: String
}) => {
  const user = await auth.user({ token })
  if (user.id) {
    await connection.query(
      `UPDATE board_tickets SET name = ?, description = ? WHERE id = ?`,
      [name, description, id]
    )

    const tickets = await getTickets({ id: boardId })
    console.log(tickets)
    return tickets
  }
}

export default {
  getBoards,
  createBoard,
  getBoardTickets,
  addRow,
  deleteRow,
  moveTo,
  editRow,
}
