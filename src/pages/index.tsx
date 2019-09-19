import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/css/style.css"
import { Container, Row, Col, ListGroup, Dropdown } from "react-bootstrap"
import { FaEllipsisH } from "react-icons/fa"
import EditRow from "./../components/EditRow"

const IndexPage = () => {
  const [onPointer, setOnPointer] = useState(null)
  const [data, setData] = useState({
    toDo: [{ name: "task 1" }, { name: "task 2" }],
    progress: [{ name: "task 3" }, { name: "task 4" }, { name: "task 5" }],
    done: [{ name: "task 6" }, { name: "task 7" }],
  })
  const [showEdit, setShowEdit] = useState({
    content: { name: "" },
    status: false,
    colName: "",
    i: 0,
  })

  const editData = updatedData => {
    const { name, colName, i } = updatedData
    setData({
      ...data,
      [colName]: data[colName].map((row, j) => (i !== j ? row : { name })),
    })
    setShowEdit({ ...showEdit, status: false })
  }

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

  const removeRow = (colName, task) =>
    data[colName]
      .map((el, j) => (el.name !== task.name ? el : null))
      .filter(Boolean)

  const onMouseUp = (colName, i) => {
    if (onPointer && onPointer !== colName) {
      const task = data[colName][i]
      setData({
        ...data,
        [onPointer]: [...data[onPointer], task],
        [colName]: removeRow(colName, task),
      })
    }
  }

  const deleteItem = (colName, i) => {
    console.log(colName, i)
    const task = data[colName][i]
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
                {data.toDo.map((task, i) => (
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
                              content: data["toDo"][i],
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
                {data.progress.map((task, i) => (
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
                        <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
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
                {data.done.map((task, i) => (
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
                        <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
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

export default IndexPage
