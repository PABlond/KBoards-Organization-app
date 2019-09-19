import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"

export default ({ handleClose, data, editData }) => {
  const [updatedData, setUpdatedData] = useState({
    name: "",
  })
  const { colName, i } = data
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
          onChange={e =>
            setUpdatedData({ ...updatedData, name: e.target.value })
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => editData({ colName, i, name: updatedData.name })}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
