import React from "react"
import { Nav } from "react-bootstrap"
import { navigate } from "gatsby"

export default () => {
  return (
    <Nav
      activeKey="/"
      className="bg-dark justify-content-end"
      onSelect={(selectedKey: string) => navigate(selectedKey)}
    >
      <Nav.Item>
        <Nav.Link className="text-light" eventKey="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-light" eventKey="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-light" eventKey="/signup">Signup</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
