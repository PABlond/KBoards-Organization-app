import { getUser } from "./auth"
import client from "../config/apolloClient"
import gql from "graphql-tag"
import dispatchCurrentBoard from './dispatchCurrentBoard'

export default async ({ name, description, column, boardId }: {
  name: String
  description: String
  boardId: string | string[] | null | undefined
  column: string
}) => {
  const token = getUser()
  console.log({boardId})
  const query = gql`
    query AddRow(
      $token: String
      $name: String
      $description: String
      $column: String,
      $boardId: String
    ) {
      addRow(
        token: $token
        name: $name
        description: $description
        column: $column
        boardId: $boardId
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
        name,
        description,
        column,
        boardId
      },
    })
    .catch(err => err)
  console.log(response)
  return dispatchCurrentBoard(response.data.addRow)
}
