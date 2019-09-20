import initialState from "./initialState"
import constants from "./../config/constants"

export default (state = initialState.nav, action: {type: string, payload: any}) => {
    const { setNav } = constants
    const { type, payload } = action
    switch (type) {
      case setNav.name:
        return {
          ...state,
          isMobile: payload.isMobile,
          maxWidth: payload.innerWidth,
          maxHeight: payload.innerHeight,
        }
      default:
        return state
    }
  }