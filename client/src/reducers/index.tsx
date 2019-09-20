import { combineReducers } from "redux"
import nav from './navReducer'
import user from './userReducer'

export default combineReducers({ nav, user })