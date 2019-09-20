import authResolvers from './auth.resolvers'
import boardsResolvers from './boards.resolvers'

export default {
    ...authResolvers,
    ...boardsResolvers

}