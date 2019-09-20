import boards from "./../services/boards"

export default {
  getBoards: async ({ token }: { token: string }) => {
    return await boards.getBoards({ token })
  },
  createBoard: async ({
    token,
    title,
    description,
  }: {
    token: string
    title: string
    description: string
  }) => {
    console.log("CREATE A BOARD")
    return await boards.createBoard({ token, title, description })
  },
  getBoardTickets: async ({ token, id }: { token: string; id: String }) => {
    return await boards.getBoardTickets({ token, id })
  },
  addRow: async ({
    token,
    name,
    description,
    column,
    boardId,
  }: {
    token: string
    name: String
    description: String
    column: String
    boardId: String
  }) => {
    console.log({
      token,
      name,
      description,
      column,
      boardId,
    })
    return await boards.addRow({
      token,
      name,
      description,
      column,
      boardId,
    })
  },
}
