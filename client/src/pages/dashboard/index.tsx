import React from 'react'
import Layout from './../../components/Layout/index.logged'
import Dashboard from './../../components/Dashboard'
import NavLogged from './../../components/Navs/index.logged'

export default () => {

    return (
        <Layout>
            <NavLogged />
            <Dashboard />
        </Layout>
    )
}