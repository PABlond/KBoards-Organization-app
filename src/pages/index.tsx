import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/css/style.css"
import { StaticQuery, graphql } from "gatsby"
import { IRow } from "./../interfaces/data.interface"

import Board from "./../components/Board"

export default () => {
  const formatResult = (edges: { node: IRow }[]) =>
    edges.map(edge => {
      const { name, description } = edge.node
      return { name, description }
    })
  return (
    <StaticQuery
      query={graphql`
        query MyQuery {
          allToDoJson {
            edges {
              node {
                name
                description
              }
            }
          }
          allProgressJson {
            edges {
              node {
                name
                description
              }
            }
          }
          allDoneJson {
            edges {
              node {
                name
                description
              }
            }
          }
        }
      `}
      render={data => {
        const toDo = formatResult(data.allToDoJson.edges)
        const progress = formatResult(data.allProgressJson.edges)
        const done = formatResult(data.allDoneJson.edges)
        const props = { toDo, progress, done }
        return <Board {...props} />
      }}
    />
  )
}
