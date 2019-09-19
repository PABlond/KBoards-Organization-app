import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./../assets/css/style.css"
import { StaticQuery, graphql } from "gatsby"
import { IRow } from "./../interfaces/data.interface"
import {Container} from 'react-bootstrap'
import Board from  "./../components/Board"
import Footer from './../components/Footer'

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
        return (
          <Container fluid style={{minHeight: "100vh"}}>
            <h1 className="text-center mt-3 w-100 p-3  font-weight-bold">
              Kanban Board
            </h1>
            <Board {...props} />
            <Footer />
          </Container>
        )
      }}
    />
  )
}
