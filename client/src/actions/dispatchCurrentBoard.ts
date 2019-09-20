import store from "./../store"
import constants from "./../config/constants"
import {IRow} from './../interfaces/data.interface'

export default (list: any) => {
  const toDo = list
    .map((row: IRow) => (row.cat == "toDo" ? row : null))
    .filter(Boolean)
  const progress = list
    .map((row: IRow) => (row.cat == "progress" ? row : null))
    .filter(Boolean)
  const done = list
    .map((row: IRow) => (row.cat == "done" ? row : null))
    .filter(Boolean)
  const payload = { toDo, progress, done }
  const { setBoardTickets } = constants
  store.dispatch({
    type: setBoardTickets.name,
    payload,
  })
}
