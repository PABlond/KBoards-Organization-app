import { combineReducers } from "redux"
import nav from './navReducer'
import user from './userReducer'
import boards from './boardsReducer'

export default combineReducers({ nav, user, boards })