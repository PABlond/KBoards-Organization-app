import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { LoginForm } from './../../interfaces/auth.interface'
import { handleLogin } from './../../actions/auth'
import Loading from './../Loading'

const LOGIN_REQ = gql`
    query Login($email: String!, $password: String) {
        login(email: $email, password: $password) {
            token
        }
    }
`
export default ({ email, password }: LoginForm) => {
    const { loading, error, data } = useQuery(LOGIN_REQ, {
        variables: { email, password },
    })

    useEffect(() => {
        if (!loading && data) {
            handleLogin(data.login.token)
            navigate('/dashboard')
        } else if (error) {
            console.log(error)
        }
    })

    return loading ? (
        <Loading />
    ) : (
        !data ? (
            <p className="text-danger">
                Login failed, please check your email and/or password
            </p>
        ) : null
    )
}
