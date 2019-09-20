import { getUser } from "./auth"
import client from "../config/apolloClient"
import gql from "graphql-tag"
import dispatchCurrentBoard from './dispatchCurrentBoard'

export default async ({ id, boardId, to }) => {
  const token = getUser()
  console.log({boardId})
  const query = gql`
    query MoveTo(
      $token: String
      $boardId: String
      $id: Int
      $to: String
    ) {
      moveTo(
        token: $token
        boardId: $boardId
        id: $id
        to: $to
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
        boardId,
        to
      },
    })
    .catch(err => err)
  console.log(response)
  return dispatchCurrentBoard(response.data.moveTo)
}
