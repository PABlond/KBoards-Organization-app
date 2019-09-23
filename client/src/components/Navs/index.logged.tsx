import React, { useEffect } from "react"
import { Nav, Navbar } from "react-bootstrap"
import { navigate } from "gatsby"
import { connect } from "react-redux"

const LoggedNav = ({ boards }: any) => {

  return (
    <Navbar collapseOnSelect expand="lg" id="nav" fixed="top">
      <Navbar.Brand className="text-light" href="#home">
        React-Bootstrap
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          activeKey="/"
          className="justify-content-end"
          onSelect={(selectedKey: string) => navigate(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link className="text-light" eventKey="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-light" eventKey="/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-light" eventKey="/signup">
              Signup
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state: any) => {
  return {
    boards: state.boards,
  }
}

export default connect(mapStateToProps)(LoggedNav)
