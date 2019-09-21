import React from "react"
import Nav from "./../components/Navs"
import { graphql, navigate } from "gatsby"
import Img from "gatsby-image"
import { Container, Row, Col, Button } from "react-bootstrap"

export default ({ data }: any) => {
  console.log(data)
  return (
    <>
      <Nav />
      <section id="hero">
        <Container>
          <Row>
            <Col lg={5}>
              <h1>
                KBoard lets you work more collaboratively and get more done.
              </h1>
              <p>
                KBoard’s boards, lists, and cards enable you to organize and
                prioritize your projects in a fun, flexible, and rewarding way.
              </p>
            </Col>
            <Col lg={7}>
              <Img fluid={data.work.childImageSharp.fluid} alt="Meeting" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="collaborate-1">
        <Container>
          <Row>
            <Col lg={8}>
              <Img fluid={data.meeting.childImageSharp.fluid} alt="Meeting" />
            </Col>
            <Col md={4}>
              <h3>Work with any team</h3>
              <p>
                Whether it’s for work, a side project or even the next family
                vacation, KBoard helps your team stay organized.
              </p>

              <Button onClick={() => navigate("/signup")}>
                Start doing ->
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="collaborate-2">
        <Container>
          <Row>
            <Col md={5}>
              <h3>Information at a glance</h3>
              <p>
                Dive into the details by adding comments, attachments, due
                dates, and more directly to KBoard cards. Collaborate on
                projects from beginning to end.
              </p>
            </Col>
            <Col lg={7}>
              <Img fluid={data.startup.childImageSharp.fluid} alt="Meeting" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export const query = graphql`
  query {
    startup: file(relativePath: { eq: "40421.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 960, maxHeight: 720) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    work: file(relativePath: { eq: "19833.png" }) {
      childImageSharp {
        fluid(maxWidth: 960, maxHeight: 720) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    meeting: file(relativePath: { eq: "2856741.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 960, maxHeight: 720) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
