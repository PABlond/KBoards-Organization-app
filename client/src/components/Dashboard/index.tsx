import React, { useEffect, useState } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { getUser } from "./../../actions/auth"
import Loading from "./../Loading"
import { connect } from "react-redux"

import BoardsList from "./BoardsList"
import CreateBoard from "./CreateBoard"
import dispatchBoardsList from "./../../actions/dispatchBoardsList"
import { IBoard } from "./../../interfaces/data.interface"
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
  const token = getUser()
  const { loading, error, data = {} }: any = useQuery(GET_BOARDS, {
    variables: { token },
  })
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  useEffect(() => {
    if (loading) {
      console.log("loading")
    } else if (data.getBoards && isLoading) {
      console.log("data", data.getBoards)
      dispatchBoardsList(data.getBoards)
      setIsLoading(false)
    }
  })

  return !isLoading ? (
    <>
      <h1>Dashboard</h1>
      <CreateBoard />
      <BoardsList boards={boards.list} />
    </>
  ) : (
    <Loading />
  )
}

function mapStateToProps(state: any) {
  return {
    boards: state.boards,
  }
}

export default connect(mapStateToProps)(Dashboard)
