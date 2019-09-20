import React, {useEffect} from 'react'
import store from './../../store'
import Layout from './../../components/Layout/index.logged'

export default () => {
    useEffect(() => {
        console.log(store.getState())
    })

    return (
        <Layout>
        <h1>Dashboard</h1>
        </Layout>
    )
}