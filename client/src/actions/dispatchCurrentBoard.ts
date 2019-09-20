import store from "./../store"
import constants from "./../config/constants"

export default (list: any) => {
  const toDo = list
    .map((row, i: number) => (row.cat == "toDo" ? row : null))
    .filter(Boolean)
  const progress = list
    .map((row, i: number) => (row.cat == "progress" ? row : null))
    .filter(Boolean)
  const done = list
    .map((row, i: number) => (row.cat == "done" ? row : null))
    .filter(Boolean)
  const payload = { toDo, progress, done }
  const { setBoardTickets } = constants
  store.dispatch({
    type: setBoardTickets.name,
    payload,
  })
}
