import auth, {IUser} from './../services/auth'
import getPreviousSessions from './../services/getPreviousSessions'
import getPreviousAlerts from './../services/getPreviousAlerts'
import getLiveStream from './../services/getLiveStream'
import getLiveMonitors from './../services/getLiveMonitors'

export default {
    login: async ({ email, password }: IUser) => {
        return await auth.login({ email, password })
    },
    signup: async ({ firstname, lastname, email, password }: IUser) => {
        console.log('SIGNUP')
        return await auth.signup({ firstname, lastname, email, password })
    },
    user: async ({token}: {token: string}) => {
        return await auth.user({token})
    },
    previousSessions: async ({token}: {token: string}) => {
        console.log(await getPreviousSessions({token}))
        return await getPreviousSessions({token})
    },
    previousAlerts: async ({token}: {token: string}) => {
        return await getPreviousAlerts({token})
    },
    liveStream: async ({token}: {token: string}) => {
        return await getLiveStream({token})
    },
    liveMonitors: async ({token}: {token: string}) => {
        return await getLiveMonitors({token})
    },
    userConfirm: async ({uniqid, userid}: {uniqid: string, userid: string}) => {
        return await auth.userConfirm({uniqid, userid})
    },
    confirmResend: async ({email}: {email: string}) => {        
        return await auth.resendUserConfirm({email})
    },
}
