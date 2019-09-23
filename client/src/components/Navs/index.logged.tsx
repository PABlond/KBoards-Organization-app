import React from "react"
import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { navigate } from "gatsby"
import { connect } from "react-redux"
import { IBoard } from "./../../interfaces/data.interface"
import { logout } from "./../../actions/auth"

const LoggedNav = ({ boards }: any) => {
  return (
    <Navbar collapseOnSelect expand="lg" id="nav" fixed="top">
      <Navbar.Brand
        className="text-light cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        KBoards
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          activeKey="/"
          className="justify-content-end"
          onSelect={(selectedKey: string) => navigate(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="/dashboard">Dashboard</Nav.Link>
          </Nav.Item>
          <NavDropdown
            title="Boards"
            className="text-light"
            id="collasible-nav-dropdown"
          >
            {boards.list.length ? (
              boards.list.map((board: IBoard, i: number) => (
                <NavDropdown.Item
                  key={i}
                  href={`/dashboard/board?id=${board.id}`}
                >
                  {board.title}
                </NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item disable>No board</NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>

        <Nav className="justify-content-end" activeKey="/home">
          <NavDropdown
            title="User"
            className="text-light"
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
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
