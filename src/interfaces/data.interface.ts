export interface IColumn {
    name: string
}

export interface IData {
  toDo: IColumn[]
  progress: IColumn[]
  done: IColumn[]
}
