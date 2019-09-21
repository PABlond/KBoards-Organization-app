import auth, {IUser} from './../services/auth'

export default {
    login: async ({ email, password }: IUser) => {
        return await auth.login({ email, password })
    },
    signup: async ({ firstname, lastname, email, password }: IUser) => {
        console.log('SIGNUP')
        return await auth.signup({ firstname, lastname, email, password })
    },
    user: async ({token}: {token: string}) => {
        console.log( await auth.user({token}))
        return await auth.user({token})
    },
    userConfirm: async ({uniqid, userid}: {uniqid: string, userid: string}) => {
        return await auth.userConfirm({uniqid, userid})
    },
    confirmResend: async ({email}: {email: string}) => {        
        return await auth.resendUserConfirm({email})
    },
}
