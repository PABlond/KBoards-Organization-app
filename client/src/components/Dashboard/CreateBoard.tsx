import React, { useEffect, useState } from "react"
import BoardCreation from "./../Modals/BoardCreation"
import { Button } from "react-bootstrap"

export default () => {
  const [show, setShow] = useState(false)

  useEffect(() => {}, [])

  return (
    <>
      <Button id="create-board" onClick={() => setShow(true)}>
        Create a board
      </Button>

      <BoardCreation show={show} handleClose={() => setShow(false)} />
    </>
  )
}
