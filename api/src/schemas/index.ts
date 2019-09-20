import { buildSchema } from 'graphql'

export default buildSchema(`
  type User {
    id: Int
    email: String
    firstname: String
    lastname: String
    is_check: Boolean
    isLogged: Boolean
  }

  type Token {
    token: String
  }

  type UserConfirm {
    response: Boolean
  }

  type Board {
    id: Int
    userid: Int
    title: String
    role: String
    description: String
    created_at: String
    last_update: String
  }

  type Query {
    login(email: String, password: String): Token,
    signup(firstname: String, lastname: String, email: String, password: String): Token
    isLogged(token: String): Boolean
    user(token: String): User
    userConfirm(uniqid: String, userid: String): UserConfirm
    confirmResend(email: String): Boolean
    getBoards(token: String): [Board]
    createBoard(token: String, title: String, description: String): [Board]
  }
`)
