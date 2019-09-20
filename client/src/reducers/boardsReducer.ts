import initialState from "./initialState"
import constants from "./../config/constants"

export default (state = initialState.boards, action: {type: string, payload: any}) => {
    const { setBoardsList } = constants
    const { type, payload } = action
    switch (type) {
        case setBoardsList.name: 
            return {
                list: payload
            }
      default:
        return state
    }
  }