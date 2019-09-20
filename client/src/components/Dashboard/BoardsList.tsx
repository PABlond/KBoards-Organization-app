import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import store from "./../../store"
import { navigate } from "gatsby"
import { IBoard } from "./../../interfaces/data.interface"

export default ({ boards }: {boards: IBoard[]}) => {
  const navigateToBoard = board => {
    console.log(board)
    navigate(`/dashboard/board?id=${board.id}`)
  }

  return (
    <>
      <h3>Boards list:</h3>
      {boards.length ? (
        <Container>
          {boards.map((board: IBoard, i: number) => (
            <a onClick={() => navigateToBoard(board)} key={i}>
              {board.title}
            </a>
          ))}
        </Container>
      ) : (
        <p>No board yet</p>
      )}
    </>
  )
}
