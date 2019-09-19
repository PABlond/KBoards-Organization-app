export interface IRow {
    name: string
}

export interface IData {
  toDo: IRow[]
  progress: IRow[]
  done: IRow[]
}
