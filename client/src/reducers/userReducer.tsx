import initialState from './initialState'
import constants from './../config/constants'

export default (
    state = initialState.user,
    action: { type: string; payload: any }
) => {
    const {
        signIn,
        signUp,
        userInfo,
        setLastSessions,
        setLastAlerts,
        setLiveSessions
    } = constants
    const { type, payload } = action
    switch (type) {
        case signIn.name || signUp.name:
            return {
                ...state,
                username: payload.username,
                _id: payload._id,
            }
        case userInfo.name:
            return {
                ...state,
                email: payload.email,
                id: payload.id,
                firstname: payload.firstname,
                lastname: payload.lastname,
            }
        case setLastSessions.name:
            return {
                ...state,
                previousSessions: payload,
            }
        case setLastAlerts.name:
            return {
                ...state,
                previousAlerts: payload,
            }
        case setLiveSessions.name: 
            return {
                ...state,
                liveSessions: payload
            }
        default:
            return state
    }
}
