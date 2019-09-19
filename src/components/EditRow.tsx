import React, { useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { IRow } from "./../interfaces/data.interface"

export default ({
  handleClose,
  data,
  editData,
}: {
  handleClose: () => void
  data: { content: IRow; status: boolean; colName: string; i: number }
  editData: (args: { name: string; colName: string; i: number }) => void
}) => {
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
          onChange={(e: any) =>
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
