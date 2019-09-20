import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { IRow } from "./../../interfaces/data.interface"

export default ({
  data,
  handleClose,
  addData,
}: {
  data: {
    content: IRow
    status: boolean
    colName: string
  }
  handleClose: () => void
  addData: (args: {
    name: string
    colName: string
    description: string
  }) => void
}) => {
  const initialDataValues = {
    name: "",
    description: "",
  }
  const [updatedData, setUpdatedData] = useState(initialDataValues)

  const saveChanges = () => {
    const { name, description } = updatedData
    const { colName } = data
    console.log({
      name,
      colName,
      description,
    })
    addData({
      name,
      colName,
      description,
    })
    setUpdatedData(initialDataValues)
  }

  return (
    <Modal show={data.status} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.content.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Name"
          value={updatedData.name}
          onChange={(e: any) =>
            setUpdatedData({ ...updatedData, name: e.target.value })
          }
        />
        <Form.Control
          as="textarea"
          rows="3"
          placeholder="Description"
          value={updatedData.description}
          onChange={(e: any) =>
            setUpdatedData({ ...updatedData, description: e.target.value })
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
