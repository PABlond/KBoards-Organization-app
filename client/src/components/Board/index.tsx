import React, { useEffect, useState } from "react"
import { Container, Row, Col, ListGroup, Dropdown } from "react-bootstrap"
import { FaEllipsisH, FaPlus, FaArrowsAltH } from "react-icons/fa"
import EditRow from "./../Modals/EditRow"
import AddRow from "./../Modals/AddRow"
import {
  IData,
  IRow,
  IModalData,
  IBoardState,
  IColumn,
} from "./../../interfaces/data.interface"
import { connect } from "react-redux"
import Loading from "./../Loading"
import { socket } from "./../../config/sockets"

const Board = ({
  boards,
  boardId,
}: {
  boards: IBoardState
  boardId: string | string[] | null | undefined
}) => {
  const [onPointer, setOnPointer] = useState<string | null>(null)
  const [data, setData] = useState<IData>(boards.currentBoard)
  const initialModalData = {
    content: { name: "", description: "" },
    status: false,
    colName: "",
    i: 0,
  }
  const [showEdit, setShowEdit] = useState<IModalData>(initialModalData)
  const [showAdd, setShowAdd] = useState<IModalData>(initialModalData)
  const [waitingResponse, setWaitingResponse] = useState<Boolean>(false)

  const editRow = (updatedData: {
    name: string
    description: string
    colName: string
    i: number
  }) => {
    const { name, description, colName, i } = updatedData
    const task = (data as any)[colName][i]
    socket.emit("editRow", { id: task.id, name, description, boardId })
    setShowEdit(initialModalData)
  }

  const removeRow = (colName: string, task: IRow | { name: string }) =>
    (data as any)[colName]
      .map((el: IRow) => (el.name !== task.name ? el : null))
      .filter(Boolean)

  const onMouseUp = async (colName: string, i: number) => {
    if (onPointer && onPointer !== colName) {
      document
        .getElementsByClassName(`ticket-${colName}-${i}`)[0]
        .classList.remove("is-dragging")
      moveTo(colName, i)
    }
  }

  const deleteItem = (colName: string, i: number) => {
    const { id }: IRow = (data as any)[colName][i]
    const task = (data as any)[colName][i]
    socket.emit("deleteRow", { id, name: task.name, colName })
  }

  const addRow = async ({
    name,
    colName,
    description,
  }: {
    name: string
    colName: string
    description: string
  }) => {
    socket.emit("addRow", {
      name,
      boardId,
      description,
      column: colName,
    })
    setShowAdd({ ...showAdd, status: false })
  }

  const moveTo = async (colName: string, i: number, to = onPointer) => {
    const { id, name, description } = (data as any)[colName][i]
    socket.emit("moveTo", {
      id,
      name,
      description,
      colName,
      to,
    })
    setWaitingResponse(true)
  }

  useEffect(() => {
    return () => setData(boards.currentBoard)
  }, [boards])

  useEffect(() => {
    socket.on(
      "addRow",
      ({
        name,
        description,
        column,
      }: {
        name: String
        description: String
        column: string
      }) => {
        setData({
          ...data,
          [column]:
            Object.keys(data).indexOf(column) !== -1
              ? [...(data as any)[column], { name, description }]
              : [{ name, description }],
        })
        setWaitingResponse(false)
      }
    )

    socket.on(
      "moveTo",
      ({
        to,
        colName,
        name,
        description,
      }: {
        to: string
        colName: string
        name: string
        description: string
      }) => {
        console.log('moving from / to', colName, to)
        setData({
          ...data,
          [to]:
            Object.keys(data).indexOf(to) !== -1
              ? [...(data as any)[to], { name, description }]
              : [{ name, description }],
          [colName]:
            Object.keys(data).indexOf(colName) !== -1
              ? removeRow(colName, { name })
              : [],
        })
        setWaitingResponse(false)
      }
    )

    socket.emit(
      "editRow",
      ({
        i,
        name,
        description,
        colName,
      }: {
        id: string
        name: string
        description: string
        i: Number
        colName: string
      }) => {
        setData({
          ...data,
          [colName]: (data as any)[colName].map((row: IRow, j: number) =>
            i !== j ? row : { name, description }
          ),
        })
      }
    )

    socket.on(
      "deleteRow",
      ({ colName, name }: { colName: string; name: string }) => {
        setData({
          ...data,
          [colName]:
            Object.keys(data).indexOf(colName) !== -1
              ? removeRow(colName, { name })
              : [],
        })
      }
    )
  }, [data])

  const { columns } = boards

  return (
    <Container fluid>
      {waitingResponse && (
        <Container id="loading-temp">
          <Loading />
        </Container>
      )}

      <Container>
        <Row id="board" className={waitingResponse && "loading-active"}>
          {columns.map((column: IColumn, k: number) => {
            const otherColumns = columns
              .map((col: IColumn, l: Number) => (l !== k ? col : null))
              .filter(Boolean)

            return (
              <Col
                key={k}
                md={4}
                className="board-column"
                onDragEnter={() => setOnPointer(column.name)}
              >
                <Container>
                  <ListGroup>
                    <ListGroup.Item
                      className="text-center font-weight-bold"
                      style={{ background: column.color }}
                    >
                      {column.name}
                      <span
                        style={{ float: "right" }}
                        onClick={() =>
                          setShowAdd({
                            ...showAdd,
                            colName: column.name,
                            status: true,
                          })
                        }
                      >
                        <FaPlus />
                      </span>
                    </ListGroup.Item>
                    {(data as any)[column.name] &&
                      (data as any)[column.name].map((task: any, i: number) => (
                        <ListGroup.Item
                          draggable
                          onDragStart={() =>
                            document
                              .getElementsByClassName(
                                `ticket-${column.name}-${i}`
                              )[0]
                              .classList.add("is-dragging")
                          }
                          onDragEnd={() => onMouseUp(column.name, i)}
                          key={i}
                          className={`ticket ticket-${column.name}-${i}`}
                        >
                          {task.name}
                          <span style={{ display: "flex" }}>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="light"
                                id="dropdown-basic"
                              >
                                <FaArrowsAltH />
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                {otherColumns.map((col, k) => (
                                  <Dropdown.Item
                                    key={k}
                                    onClick={() =>
                                      moveTo(column.name, i, col.name)
                                    }
                                  >
                                    {col.name}
                                  </Dropdown.Item>
                                ))}
                              </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="light"
                                id="dropdown-basic"
                              >
                                <FaEllipsisH />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    setShowEdit({
                                      ...showEdit,
                                      content: (data as any)[column.name]
                                        ? (data as any)[column.name][i]
                                        : { name: "", description: "" },
                                      status: true,
                                      colName: column.name,
                                      i,
                                    })
                                  }
                                >
                                  Edit
                                </Dropdown.Item>
                                <Dropdown.Item></Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => deleteItem(column.name, i)}
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Container>
              </Col>
            )
          })}
        </Row>
      </Container>

      <EditRow
        handleClose={() => setShowEdit({ ...showEdit, status: false })}
        data={showEdit}
        editData={editRow}
      />
      <AddRow
        handleClose={() => setShowAdd({ ...showAdd, status: false })}
        addData={addRow}
        data={showAdd}
      />
    </Container>
  )
}

const mapStateToProps = (state: any) => {
  return {
    boards: state.boards,
  }
}

export default connect(mapStateToProps)(Board)
