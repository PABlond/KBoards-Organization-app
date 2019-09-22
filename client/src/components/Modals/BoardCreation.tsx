import React, { useState } from "react"
import { Modal, Button, Form, Col } from "react-bootstrap"
import client from "./../../config/apolloClient"
import { getUser } from "./../../actions/auth"
import gql from "graphql-tag"
import dispatchBoardsList from "./../../actions/dispatchBoardsList"
import { TwitterPicker } from "react-color"
import { socket } from "./../../config/sockets"

export default ({
  show,
  handleClose,
}: {
  show: boolean
  handleClose: () => void
}) => {
  const initialDataValues = {
    title: "",
    description: "",
  }
  const columnType = {
    name: "",
    color: "#000000",
    colorShow: false,
  }
  const [updatedData, setUpdatedData] = useState(initialDataValues)
  const [columns, setColumns] = useState<
    { name: string; color: string; colorShow: Boolean }[]
  >([columnType])
  const saveChanges = async () => {
    const token = getUser()
    const { title, description } = updatedData
    // const query = gql`
    //   query CreateBoard($token: String, $title: String, $description: String) {
    //     createBoard(token: $token, title: $title, description: $description) {
    //       title
    //       description
    //       created_at
    //       last_update
    //       role
    //     }
    //   }
    // `
    // const response = await client
    //   .query({
    //     query: query,
    //     variables: {
    //       token,
    //       title,
    //       description,
    //     },
    //   })
    //   .catch(err => err)
    socket.emit("createBoard", { title, description, columns })
    setUpdatedData(initialDataValues)
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Title"
              value={updatedData.title}
              onChange={(e: any) =>
                setUpdatedData({ ...updatedData, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              value={updatedData.description}
              onChange={(e: any) =>
                setUpdatedData({ ...updatedData, description: e.target.value })
              }
            />
          </Form.Group>
          {columns.map((column, i) => (
            <Form.Group
              key={i}
              controlId="exampleForm.ControlInput1"
              className="row"
            >
              <Col sm={8}>
                <Form.Control
                  type="text"
                  placeholder={`column ${i + 1}`}
                  value={column.name}
                  onChange={(e: any) =>
                    setColumns(
                      columns.map((col, k) =>
                        k !== i ? col : { ...col, name: e.target.value }
                      )
                    )
                  }
                />
              </Col>
              <Col sm={4}>
                {column.colorShow ? (
                  <TwitterPicker
                    onChangeComplete={(color: any) => {
                      setColumns(
                        columns.map((col, k) =>
                          k !== i
                            ? col
                            : { ...col, colorShow: false, color: color.hex }
                        )
                      )
                    }}
                  />
                ) : (
                  <Button
                    style={{ background: column.color }}
                    onClick={() => {
                      setColumns(
                        columns.map((col, k) =>
                          k !== i ? col : { ...col, colorShow: true }
                        )
                      )
                    }}
                  />
                )}
              </Col>
            </Form.Group>
          ))}

          <Button onClick={() => setColumns([...columns, columnType])}>
            New Column
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveChanges}>
          Create this board
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
