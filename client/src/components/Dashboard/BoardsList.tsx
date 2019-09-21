import React from "react"
import { Container, Button, Col } from "react-bootstrap"
import { navigate } from "gatsby"
import { IBoard } from "./../../interfaces/data.interface"

export default ({ boards }: { boards: IBoard[] }) => {
  const navigateToBoard = (board: IBoard) => {
    navigate(`/dashboard/board?id=${board.id}`)
  }

  return (
    <>
      <h3 id="second-title">Personal Boards</h3>
      {boards.length ? (
        <Container id="personal-boards">
          {boards.map((board: IBoard, i: number) => (
            <Col md={3} key={i}>
              <Button onClick={() => navigateToBoard(board)}>
                {board.title}
              </Button>
            </Col>
          ))}
        </Container>
      ) : (
        <p>No board yet</p>
      )}
    </>
  )
}
