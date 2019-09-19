import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/css/style.css"
import { StaticQuery, graphql } from "gatsby"

import Board from "./../components/Board"

export default () => {
  const formatResult = (edges: { node: { name: string } }[]) =>
    edges.map(edge => {
      const { name } = edge.node
      return { name }
    })
  return (
    <StaticQuery
      query={graphql`
        query MyQuery {
          allToDoJson {
            edges {
              node {
                name
              }
            }
          }
          allProgressJson {
            edges {
              node {
                name
              }
            }
          }
          allDoneJson {
            edges {
              node {
                name
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
