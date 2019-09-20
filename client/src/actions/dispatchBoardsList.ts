import store from "./../store"
import constants from "./../config/constants"
import { IBoard } from "./../interfaces/data.interface"

export default (list: IBoard[]) => {
  const { setBoardsList } = constants
  store.dispatch({
    type: setBoardsList.name,
    payload: list,
  })
}
