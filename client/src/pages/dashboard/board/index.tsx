import React, { useEffect, useState } from "react"
import queryString from "query-string"
import { connect } from "react-redux"
import { getUser } from "./../../../actions/auth"
import client from "./../../../config/apolloClient"
import gql from "graphql-tag"
import dispatchCurrentBoard from "./../../../actions/dispatchCurrentBoard"
import Board from "./../../../components/Board"
import Loading from "./../../../components/Loading"

const BoardPage = ({ location }: { location: any }) => {
  const [loading, setLoading] = useState<Boolean>(true)
  const [boardId, setId] = useState(null)

  const requestTickets = async (token: String, id: Number) => {
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
    setLoading(false)
  }
  useEffect(() => {
    const { id } = queryString.parse(location.search)
    setId(id)
    const token = getUser()
    requestTickets(token, id)
  }, [])

  return !loading ? (
    <>
      <Board boardId={boardId} />
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
