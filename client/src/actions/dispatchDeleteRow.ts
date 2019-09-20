import { getUser } from "./auth"
import client from "../config/apolloClient"
import gql from "graphql-tag"
import dispatchCurrentBoard from './dispatchCurrentBoard'

export default async ({ id, boardId }) => {
  const token = getUser()
  console.log({boardId})
  const query = gql`
    query DeleteRow(
      $token: String
      $boardId: String
      $id: Int
    ) {
      deleteRow(
        token: $token
        boardId: $boardId
        id: $id
      ) {
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
        boardId
      },
    })
    .catch(err => err)
  console.log(response)
  return dispatchCurrentBoard(response.data.deleteRow)
}
