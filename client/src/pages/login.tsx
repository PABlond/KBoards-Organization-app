import React, { useState, SyntheticEvent } from "react"
import { Container, Form, Button } from "react-bootstrap"
import HandleLogin from "./../components/Auth/HandleLogin"
import { LoginForm } from "./../interfaces/auth.interface"
import Nav from "./../components/Navs"

export default () => {
  const [loginReq, setLoginReq] = useState<boolean>(false)
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  })

  const handleChange = (e: any) => {
    setLoginReq(false)
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    setLoginReq(true)
  }

  const { email, password } = form
  const props = { email, password }

  return (
    <>
      <Nav />
      <Container id="auth-container">
        <Form onSubmit={onSubmit}>
          <div id="auth-heading">
            <h1>Login to KBoard</h1>
            <a href="/signup">or create an account</a>
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button block type="submit">
            Submit
          </Button>
        </Form>

        {loginReq && <HandleLogin {...props} />}
      </Container>
    </>
  )
}
