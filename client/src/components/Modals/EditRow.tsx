import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { IRow } from "../../interfaces/data.interface"

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
  const initialDataState = {
    name: false,
    description: false,
  }
  const [editState, setEditState] = useState<any>(initialDataState)
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
    setEditState(initialDataState)
  }

  return (
    <Modal show={data.status} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.content.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editState.name ? (
          <Form.Control
            type="text"
            placeholder={data.content.name}
            value={updatedData.name}
            onChange={(e: any) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
        ) : (
          <p onClick={() => setEditState({ ...editState, name: true })}>
            {data.content.name}
          </p>
        )}
        {editState.description ? (
          <Form.Control
            as="textarea"
            rows="3"
            className="edit-description"
            placeholder={data.content.description}
            value={updatedData.description}
            onChange={(e: any) =>
              setUpdatedData({ ...updatedData, description: e.target.value })
            }
          />
        ) : (
          <p onClick={() => setEditState({ ...editState, description: true })}>
            {data.content.description.length
              ? data.content.description
              : "No description"}
          </p>
        )}
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
