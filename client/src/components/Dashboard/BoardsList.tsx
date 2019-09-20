import React, { useEffect, useState } from "react"
import { Container, Button } from "react-bootstrap"
import { navigate } from "gatsby"
import { IBoard } from "./../../interfaces/data.interface"

export default ({ boards }: { boards: IBoard[] }) => {
  const navigateToBoard = board => {
    navigate(`/dashboard/board?id=${board.id}`)
  }

  return (
    <>
      <h3>Boards list:</h3>
      {boards.length ? (
        <Container>
          {boards.map((board: IBoard, i: number) => (
            <p key={i}>
              <Button onClick={() => navigateToBoard(board)}>
                {board.title}
              </Button>
            </p>
          ))}
        </Container>
      ) : (
        <p>No board yet</p>
      )}
    </>
  )
}
