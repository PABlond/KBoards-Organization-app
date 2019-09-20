import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Loading from './../Loading'

const RESEND_CONFIRMATION = gql`
    query Resend($email: String) {
        confirmResend(email: $email)
    }
`
export default ({ email }: {email: string | string[] | null}) => {
    const { loading, error, data } = useQuery(RESEND_CONFIRMATION, {
        variables: { email },
    })
    
    if (error) console.log(error)

    return loading ? (
        <Loading />
    ) : !data ? (
        <p className="text-danger">
            There was an error trying to send you the confirmation link. Try to
            signup again or contact an admin
        </p>
    ) : (
        <p className="text-info">An email was sent to {email}</p>
    )
}
