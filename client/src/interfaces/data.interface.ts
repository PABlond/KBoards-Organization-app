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

export interface IColumn {
  n: Number
  name: string
  color: string
  id?: Number
  board_id?: string
}

export interface IBoardState {
  currentBoard: any, 
  columns: IColumn[]
}