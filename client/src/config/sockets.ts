
import socketIOClient from "socket.io-client"
import constants from "./constants"
import {getUser} from './../actions/auth'

export const socket = socketIOClient(constants.api.url, {
    query: {token: getUser()}
})