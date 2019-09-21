import React, { useEffect, useState } from "react"
import { Container, Row, Col, ListGroup, Dropdown } from "react-bootstrap"
import { FaEllipsisH, FaPlus, FaArrowsAltH } from "react-icons/fa"
import EditRow from "./../Modals/EditRow"
import AddRow from "./../Modals/AddRow"
import { IData, IRow, IModalData } from "./../../interfaces/data.interface"
import { connect } from "react-redux"
import Loading from "./../Loading"
import { socket } from "./../../config/sockets"

const Board = ({
  boards,
  boardId,
}: {
  boards: { currentBoard: any }
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
    // const task = (data as any)[from][i]
    // await dispatchMoveTo({ id: task.id, boardId, to })
  }

  useEffect(() => {
    setData(boards.currentBoard)

    // socket.on("tickets", handler)
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
          [column]: [...(data as any)[column], { name, description }],
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
        setData({
          ...data,
          [to]: [...(data as any)[to], { name, description }],
          [colName]: removeRow(colName, { name }),
        })
        setWaitingResponse(false)
      }
    )

    socket.emit("editRow", ({i, name, description, colName}: {
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
    })

    socket.on(
      "deleteRow",
      ({ colName, name }: { colName: string; name: string }) => {
        setData({
          ...data,
          [colName]: removeRow(colName, { name }),
        })
      }
    )
  })

  return (
    <Container fluid>
      {waitingResponse && (
        <Container id="loading-temp">
          <Loading />
        </Container>
      )}

      <Container>
        <Row id="board" className={waitingResponse && "loading-active"}>
          <Col
            md={4}
            className="board-column"
            onDragEnter={() => setOnPointer("toDo")}
          >
            <Container>
              <ListGroup>
                <ListGroup.Item
                  variant="danger"
                  className="text-center font-weight-bold"
                >
                  To do{" "}
                  <span
                    style={{ float: "right" }}
                    onClick={() =>
                      setShowAdd({ ...showAdd, colName: "toDo", status: true })
                    }
                  >
                    <FaPlus />
                  </span>
                </ListGroup.Item>
                {data.toDo &&
                  data.toDo.map((task, i) => (
                    <ListGroup.Item
                      draggable
                      onDragStart={() =>
                        document
                          .getElementsByClassName(`ticket-toDo-${i}`)[0]
                          .classList.add("is-dragging")
                      }
                      onDragEnd={() => onMouseUp("toDo", i)}
                      key={i}
                      className={`ticket ticket-toDo-${i}`}
                    >
                      {task.name}
                      <span style={{ display: "flex" }}>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaArrowsAltH />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => moveTo("toDo", i, "progress")}
                            >
                              Doing
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => moveTo("toDo", i, "done")}
                            >
                              Done
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaEllipsisH />{" "}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                setShowEdit({
                                  ...showEdit,
                                  content: data["toDo"]
                                    ? data["toDo"][i]
                                    : { name: "", description: "" },
                                  status: true,
                                  colName: "toDo",
                                  i,
                                })
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item></Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => deleteItem("toDo", i)}
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

          <Col
            md={4}
            className="board-column"
            onDragEnter={() => setOnPointer("progress")}
          >
            <Container>
              <ListGroup>
                <ListGroup.Item
                  variant="warning"
                  className="text-center font-weight-bold"
                >
                  Doing
                  <span
                    style={{ float: "right" }}
                    onClick={() =>
                      setShowAdd({
                        ...showAdd,
                        colName: "progress",
                        status: true,
                      })
                    }
                  >
                    <FaPlus />
                  </span>
                </ListGroup.Item>
                {data.progress &&
                  data.progress.map((task, i) => (
                    <ListGroup.Item
                      draggable
                      onDragStart={() =>
                        document
                          .getElementsByClassName(`ticket-progress-${i}`)[0]
                          .classList.add("is-dragging")
                      }
                      onDragEnd={() => onMouseUp("progress", i)}
                      key={i}
                      className={`ticket ticket-progress-${i}`}
                    >
                      {task.name}
                      <span style={{ display: "flex" }}>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaArrowsAltH />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => moveTo("progress", i, "toDo")}
                            >
                              To do
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => moveTo("progress", i, "done")}
                            >
                              Done
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaEllipsisH />{" "}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                setShowEdit({
                                  ...showEdit,
                                  content: data["progress"]
                                    ? data["progress"][i]
                                    : { name: "", description: "" },
                                  status: true,
                                  colName: "progress",
                                  i,
                                })
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => deleteItem("progress", i)}
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

          <Col
            md={4}
            className="board-column"
            onDragEnter={() => setOnPointer("done")}
          >
            <Container>
              <ListGroup>
                <ListGroup.Item
                  variant="info"
                  className="text-center font-weight-bold"
                >
                  Done
                  <span
                    style={{ float: "right" }}
                    onClick={() =>
                      setShowAdd({ ...showAdd, colName: "done", status: true })
                    }
                  >
                    <FaPlus />
                  </span>
                </ListGroup.Item>
                {data.done &&
                  data.done.map((task, i) => (
                    <ListGroup.Item
                      draggable
                      onDragStart={() =>
                        document
                          .getElementsByClassName(`ticket-done-${i}`)[0]
                          .classList.add("is-dragging")
                      }
                      onDragEnd={() => onMouseUp("done", i)}
                      key={i}
                      className={`ticket ticket-done-${i}`}
                    >
                      {task.name}
                      <span style={{ display: "flex" }}>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaArrowsAltH />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => moveTo("done", i, "toDo")}
                            >
                              To do
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => moveTo("done", i, "progress")}
                            >
                              Doing
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaEllipsisH />{" "}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() =>
                                setShowEdit({
                                  ...showEdit,
                                  content: data["done"]
                                    ? data["done"][i]
                                    : { name: "", description: "" },
                                  status: true,
                                  colName: "done",
                                  i,
                                })
                              }
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => deleteItem("done", i)}
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
