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
    console.log( await getBoardsList(user.id))
  return await getBoardsList(user.id)
}

export default { getBoards, createBoard }
