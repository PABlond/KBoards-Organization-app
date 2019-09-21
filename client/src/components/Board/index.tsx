import React, { useEffect, useState } from "react"
import { Container, Row, Col, ListGroup, Dropdown } from "react-bootstrap"
import { FaEllipsisH, FaPlus, FaArrowsAltH } from "react-icons/fa"
import EditRow from "./../Modals/EditRow"
import AddRow from "./../Modals/AddRow"
import { IData, IRow, IModalData } from "./../../interfaces/data.interface"
import { connect } from "react-redux"
import dispatchAddRow from "./../../actions/dispatchAddRow"
import dispatchDeleteRow from "./../../actions/dispatchDeleteRow"
import dispatchMoveTo from "./../../actions/dispatchMoveTo"
import dispatchEditRow from "./../../actions/dispatchEditRow"

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

  useEffect(() => {
    setData(boards.currentBoard)
  }, [boards])

  const style = {
    listGroup: {
      item: {
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    },
  }
  const editData = (updatedData: {
    name: string
    description: string
    colName: string
    i: number
  }) => {
    const { name, description, colName, i } = updatedData
    const task = (data as any)[colName][i]
    dispatchEditRow({ id: task.id, name, description, boardId })
    setShowEdit(initialModalData)
  }

  const onMouseUp = async (colName: string, i: number) => {
    if (onPointer && onPointer !== colName) {
      const task = (data as any)[colName][i]
      await dispatchMoveTo({ id: task.id, boardId, to: onPointer })
    }
  }

  const deleteItem = (colName: string, i: number) => {
    const { id }: IRow = (data as any)[colName][i]
    dispatchDeleteRow({ id, boardId })
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
    await dispatchAddRow({ name, description, column: colName, boardId })
    setShowAdd({ ...showAdd, status: false })
  }

  const moveTo = async (from: string, to: string, i: number) => {
    const task = (data as any)[from][i]
    await dispatchMoveTo({ id: task.id, boardId, to })
  }

  return (
    <Container fluid>
      <Container>
        <Row className="mt-5">
          <Col md={4}>
            <Container>
              <ListGroup onDragEnter={() => setOnPointer("toDo")}>
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
                      onDragEnd={() => onMouseUp("toDo", i)}
                      key={i}
                      style={style.listGroup.item}
                    >
                      {task.name}
                      <span style={{ display: "flex" }}>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaArrowsAltH />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => moveTo("toDo", "progress", i)}
                            >
                              Doing
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => moveTo("toDo", "done", i)}
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

          <Col md={4}>
            <Container>
              <ListGroup onDragEnter={() => setOnPointer("progress")}>
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
                      onDragEnd={() => onMouseUp("progress", i)}
                      key={i}
                      style={style.listGroup.item}
                    >
                      {task.name}
                      <span style={{ display: "flex" }}>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaArrowsAltH />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => moveTo("progress", "toDo", i)}
                            >
                              To do
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => moveTo("progress", "done", i)}
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

          <Col md={4}>
            <Container>
              <ListGroup onDragEnter={() => setOnPointer("done")}>
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
                      onDragEnd={() => onMouseUp("done", i)}
                      key={i}
                      style={style.listGroup.item}
                    >
                      {task.name}
                      <span style={{ display: "flex" }}>
                        <Dropdown>
                          <Dropdown.Toggle variant="light" id="dropdown-basic">
                            <FaArrowsAltH />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => moveTo("done", "toDo", i)}
                            >
                              To do
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => moveTo("done", "progress", i)}
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
        editData={editData}
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
