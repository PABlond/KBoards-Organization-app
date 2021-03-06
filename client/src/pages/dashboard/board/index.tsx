import React, { useEffect, useState } from "react"
import queryString from "query-string"
import { connect } from "react-redux"
import { getUser } from "./../../../actions/auth"
import client from "./../../../config/apolloClient"
import gql from "graphql-tag"
import dispatchCurrentBoard from "./../../../actions/dispatchCurrentBoard"
import dispatchBoardColumns from "./../../../actions/dispatchBoardColumns"
import Board from "./../../../components/Board"
import Loading from "./../../../components/Loading"
import Layout from "./../../../components/Layout/index.logged"
import { socket } from "./../../../config/sockets"
import LoggedNav from './../../../components/Navs/index.logged'

const BoardPage = ({ location }: { location: any }) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [boardId, setId] = useState<string | string[] | null | undefined>(null)

  const requestTickets = async (
    token: String,
    id: string | string[] | null | undefined
  ) => {
    const query = gql`
      query GetBoardTickets($token: String, $id: String) {
        getBoardTickets(token: $token, id: $id) {
          id
          name
          description
          cat
        }
      }
    `
    const response = await client
      .query({
        query: query,
        variables: {
          token,
          id,
        },
      })
      .catch(err => err)

    dispatchCurrentBoard(response.data.getBoardTickets)
  }

  useEffect(() => {
    const { id } = queryString.parse(location.search)
    setId(id)
    const token = getUser()
    requestTickets(token, id)
    socket.emit("getColumns", { id })
    socket.on("getColumns", (data: any) => {
      dispatchBoardColumns(data)
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <>
      <Layout>
        <LoggedNav />
        <Board boardId={boardId} />
      </Layout>
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

export default connect(mapStateToProps)(BoardPage)
