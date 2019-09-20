import initialState from "./initialState"
import constants from "./../config/constants"

export default (state = initialState.boards, action: {type: string, payload: any}) => {
    const { setBoardsList, setBoardTickets } = constants
    const { type, payload } = action
    switch (type) {
        case setBoardsList.name: 
            return {
                ...state,
                list: payload
            }
        case setBoardTickets.name:
            return {
                ...state,
                currentBoard: payload
            }
      default:
        return state
    }
  }