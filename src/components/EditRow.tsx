import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { IRow } from "./../interfaces/data.interface"

export default ({
  handleClose,
  data,
  editData,
}: {
  handleClose: () => void
  data: {
    content: IRow
    status: boolean
    colName: string
    i: number
  }
  editData: (args: {
    name: string
    colName: string
    i: number
    description: string
  }) => void
}) => {
  const initialDataValues = {
    name: "",
    description: "",
  }
  const [updatedData, setUpdatedData] = useState(initialDataValues)
  const { colName, i } = data

  const saveChanges = () => {
    editData({
      colName,
      i,
      description: updatedData.description.length
        ? updatedData.description
        : data.content.description,
      name: updatedData.name.length ? updatedData.name : data.content.name,
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
          placeholder={data.content.name}
          value={updatedData.name}
          onChange={(e: any) =>
            setUpdatedData({ ...updatedData, name: e.target.value })
          }
        />
        <Form.Control
          as="textarea"
          rows="3"
          placeholder={data.content.description}
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
