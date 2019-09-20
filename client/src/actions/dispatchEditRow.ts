import { getUser } from "./auth"
import client from "../config/apolloClient"
import gql from "graphql-tag"
import dispatchCurrentBoard from "./dispatchCurrentBoard"

export default async ({
  id,
  name,
  description,
  boardId,
}: {
  id: Number
  name: String
  description: String
  boardId: string | string[] | null | undefined
}) => {
  const token = getUser()

  const query = gql`
    query EditRow(
      $token: String
      $boardId: String
      $id: Int
      $name: String
      $description: String
    ) {
      editRow(
        token: $token
        boardId: $boardId
        id: $id
        name: $name
        description: $description
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
        name,
        description,
      },
    })
    .catch(err => err)

  return dispatchCurrentBoard(response.data.editRow)
}
