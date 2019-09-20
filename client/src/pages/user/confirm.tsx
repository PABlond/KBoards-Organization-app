import React from 'react'
import queryString from 'query-string'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Loading from './../../components/Loading'

const USER_CONFIRM = gql`
    query UserConfim($uniqid: String, $userid: String) {
        userConfirm(uniqid: $uniqid, userid: $userid) {
            response
        }
    }
`

export default ({ location }: any) => {
    const { uniqid, userid } = queryString.parse(location.search)

    const { loading, error, data } = useQuery(USER_CONFIRM, {
        variables: { uniqid, userid },
    })

    if (error) console.log(error)

    return !loading ? (
        data ? (
            <p>Your account is now active, please <a href="/login">login</a></p>
        ) : (
            <p>User Confirmation not found or already confirm</p>
        )
    ) : (
        <Loading />
    )
}
