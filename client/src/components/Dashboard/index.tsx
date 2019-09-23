import React, { useEffect, useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { getUser } from "./../../actions/auth"
import Loading from "./../Loading"
import { connect } from "react-redux"
import { Container } from "react-bootstrap"
import BoardsList from "./BoardsList"
import CreateBoard from "./CreateBoard"
import dispatchBoardsList from "./../../actions/dispatchBoardsList"
import { IBoard } from "./../../interfaces/data.interface"
import { socket } from "./../../config/sockets"

const GET_BOARDS = gql`
  query GetBoards($token: String!) {
    getBoards(token: $token) {
      title
      description
      id
      created_at
      role
    }
  }
`

const Dashboard = ({ boards }: { boards: { list: IBoard[] } }) => {

  useEffect(() => {
    socket.on("boardsList", (boards: any) => {
      console.log('receive BoardsList from socket')
      dispatchBoardsList(boards)
    })
  })

  return (
    <Container id="logged-container">
      <h1 id="main-title">Dashboard</h1>
      <CreateBoard />
      <BoardsList boards={boards.list} />
    </Container>
  )
}

function mapStateToProps(state: any) {
  return {
    boards: state.boards,
  }
}

export default connect(mapStateToProps)(Dashboard)
