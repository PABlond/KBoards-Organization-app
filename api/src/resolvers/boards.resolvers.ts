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
      console.log('CREATE A BOARD')
      return await boards.createBoard({token, title, description})
  },
}
