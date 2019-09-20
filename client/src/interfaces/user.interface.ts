interface LiveSession {
    id: String
}

export interface UserType {
    id: String
    email: String
    lastname: String
    firstname: String
    liveSessions: LiveSession[]
    previousSessions: []
    previousAlerts: []
}
