import store from "./../store"
import constants from "./../config/constants"
import { IRow } from "./../interfaces/data.interface"

export default (list: any) => {
  const payload = {}
  list.forEach((row: any) => {
    (payload as any)[row.cat as string] =
      Object.keys(payload).indexOf(row.cat) !== -1
        ? [...(payload as any)[row.cat as string], row]
        : [row]
  })
  console.log(payload)
  const { setBoardTickets } = constants
  return store.dispatch({
    type: setBoardTickets.name,
    payload,
  })
}
