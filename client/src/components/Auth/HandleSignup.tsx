import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { SignupForm } from './../../interfaces/auth.interface'

const SIGNUP_REQ = gql`
    query Signup(
        $firstname: String!
        $lastname: String!
        $email: String
        $password: String
    ) {
        signup(
            firstname: $firstname
            lastname: $lastname
            email: $email
            password: $password
        ) {
            token
        }
    }
`
export default ({ firstname, lastname, email, password }: SignupForm) => {
    const { loading, error, data } = useQuery(SIGNUP_REQ, {
        variables: { firstname, lastname, email, password },
    })

    useEffect(() => {
        if (!loading && data) {
            localStorage.setItem('babycam', data.signup.token)
            navigate('/dashboard')
        } else if (error) {
            console.log(error)
        }
    })

    console.log({ loading, error, data })

    return (
        <p className="text-danger">
            Signup failed, please check your credentials
        </p>
    )
}
