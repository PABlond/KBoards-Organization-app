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

  type LiveStream {
    id: String
  }

  type LiveMonitor {
    id: String
  }

  type Token {
    token: String
  }

  type PreviousSession {
    started_at: String
    ended_at: String
    id: String
  }

  type PreviousAlerts {
    owner: Int
    type_alert: String
    video_url: String
    created_at: String
  }

  type UserConfirm {
    response: Boolean
  }

  type Query {
    login(email: String, password: String): Token,
    signup(firstname: String, lastname: String, email: String, password: String): Token
    isLogged(token: String): Boolean
    user(token: String): User
    previousSessions(token: String): [PreviousSession]
    previousAlerts(token: String): [PreviousAlerts]
    liveStream(token: String): [LiveStream]
    liveMonitors(token: String): [LiveMonitor]
    userConfirm(uniqid: String, userid: String): UserConfirm
    confirmResend(email: String): Boolean
  }
`)
