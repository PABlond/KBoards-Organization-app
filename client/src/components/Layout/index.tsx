import React, { useEffect, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Offline, Online } from 'react-detect-offline'
import OfflineAlert from './../OfflineAlert'

import { DispatchType } from './../../interfaces/redux'
import constants from './../../config/constants'

const mapStateToProps = (state: any) => {
    const { maxWidth, maxHeight } = state.nav
    return { maxWidth, maxHeight }
}

const mapDispatchToProps = (dispatch: Dispatch<DispatchType>) => {
    return {
        updateDimensions: () => {
            const { setNav }: { setNav: { name: string } } = constants
            const {
                innerHeight,
                innerWidth,
            }: { innerHeight: number; innerWidth: number } = window
            return dispatch({
                type: setNav.name,
                payload: {
                    innerWidth,
                    innerHeight,
                    isMobile: !!(innerWidth < 768),
                },
            })
        },
    }
}

const Layout = ({
    children,
    updateDimensions,
    maxWidth,
    maxHeight,
}: {
    children: JSX.Element[] | JSX.Element
    updateDimensions: () => void
    maxWidth: number
    maxHeight: number
}) => {
    useEffect(() => {
        window.addEventListener('resize', updateDimensions)
    })

    useEffect(() => {
        updateDimensions()
    }, [])

    return (
        <div style={{ margin: `0 auto`, maxWidth, maxHeight }}>
            <Online>{children}</Online>
            <Offline>
                <OfflineAlert />
            </Offline>
        </div>
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)
