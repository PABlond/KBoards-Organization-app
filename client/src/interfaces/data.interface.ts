export interface IRow {
  id?: Number
  name: string
  description: string
  cat?: string
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
  id: Number,
  title: string,
  description: string
  created_at: string
  last_update: string
  role: string
}