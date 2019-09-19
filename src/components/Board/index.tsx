import React, { useState } from "react"
import { Container, Row, Col, ListGroup, Dropdown } from "react-bootstrap"
import { FaEllipsisH } from "react-icons/fa"
import EditRow from "./../EditRow"
import { IData, IRow, IModalData } from "./../../interfaces/data.interface"

export default (inputData: IData) => {
  const [onPointer, setOnPointer] = useState<string | null>(null)
  const [data, setData] = useState<IData>(inputData)
  const initialModalData = {
    content: { name: "", description: "" },
    status: false,
    colName: "",
    i: 0,
  }
  const [showEdit, setShowEdit] = useState<IModalData>(initialModalData)

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
    setData({
      ...data,
      [colName]: (data as any)[colName].map((row: IRow, j: number) =>
        i !== j ? row : { name, description }
      ),
    })
    setShowEdit(initialModalData)
  }

  const removeRow = (colName: string, task: IRow) =>
    (data as any)[colName]
      .map((el: IRow) => (el.name !== task.name ? el : null))
      .filter(Boolean)

  const onMouseUp = (colName: string, i: number) => {
    if (onPointer && onPointer !== colName) {
      const task = (data as any)[colName][i]
      setData({
        ...data,
        [onPointer]: [...(data as any)[onPointer], task],
        [colName]: removeRow(colName, task),
      })
    }
  }

  const deleteItem = (colName: string, i: number) => {
    console.log(colName, i)
    const task: IRow = (data as any)[colName][i]
    setData({
      ...data,
      [colName]: removeRow(colName, task),
    })
  }

  return (
    <Container fluid>
      <Container>
        <Row className="mt-5">
          <Col md={4}>
            <Container className="border">
              <ListGroup onDragEnter={() => setOnPointer("toDo")}>
                <ListGroup.Item variant="danger">To do</ListGroup.Item>
                {data.toDo &&
                  data.toDo.map((task, i) => (
                    <ListGroup.Item
                      draggable
                      onDragEnd={() => onMouseUp("toDo", i)}
                      key={i}
                      style={style.listGroup.item}
                    >
                      {task.name}
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
                          <Dropdown.Item onClick={() => deleteItem("toDo", i)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Container>
          </Col>

          <Col md={4}>
            <Container className="border">
              <ListGroup onDragEnter={() => setOnPointer("progress")}>
                <ListGroup.Item variant="warning">In progress</ListGroup.Item>
                {data.progress &&
                  data.progress.map((task, i) => (
                    <ListGroup.Item
                      draggable
                      onDragEnd={() => onMouseUp("progress", i)}
                      key={i}
                      style={style.listGroup.item}
                    >
                      {task.name}
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
                          <Dropdown.Item onClick={() => deleteItem("progress", i)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Container>
          </Col>

          <Col md={4}>
            <Container className="border">
              <ListGroup onDragEnter={() => setOnPointer("done")}>
                <ListGroup.Item variant="info">Done</ListGroup.Item>
                {data.done &&
                  data.done.map((task, i) => (
                    <ListGroup.Item
                      draggable
                      onDragEnd={() => onMouseUp("done", i)}
                      key={i}
                      style={style.listGroup.item}
                    >
                      {task.name}
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
                          <Dropdown.Item onClick={() => deleteItem("done", i)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
    </Container>
  )
}
