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
    return await boards.createBoard({ token, title, description })
  },
  getBoardTickets: async ({ token, id }: { token: string; id: String }) => {
    return await boards.getBoardTickets({ token, id })
  },
  deleteRow: async ({
    token,
    id,
    boardId,
  }: {
    token: string
    id: String
    boardId: string
  }) => {
    return await boards.deleteRow({ token, id, boardId })
  },
  moveTo: async ({
    token,
    id,
    boardId,
    to
  }: {
    token: string
    id: String
    boardId: string
    to: String
  }) => {
    return await boards.moveTo({ token, id, boardId, to })
  },
  editRow: async ({
    token,
    id,
    boardId,
    name, description
  }: {
    token: string
    id: String
    boardId: string
    name: String, description: String
  }) => {
    return await boards.editRow({ token, id, boardId, name, description })
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
    boardId: string
  }) => {
    return await boards.addRow({
      token,
      name,
      description,
      column,
      boardId,
    })
  },
}
