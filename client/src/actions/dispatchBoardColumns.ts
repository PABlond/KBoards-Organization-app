import store from "./../store"
import constants from "./../config/constants"
import { IColumn } from "./../interfaces/data.interface"

export default (list: IColumn[]) => {
  const { setBoardColumns } = constants
  
  return store.dispatch({
    type: setBoardColumns.name,
    payload: list,
  })
}
