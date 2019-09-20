export interface IRow {
  name: string
  description: string
}

export interface IData {
  toDo: IRow[]
  progress: IRow[]
  done: IRow[]
}

export interface IModalData {
  content: IRow
  status: boolean
  colName: string
  i: number
}

export interface IBoard {
  title: string,
  description: string
  created_at: string
  last_update: string
  role: string
}