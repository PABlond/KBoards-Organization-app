import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { connect } from "react-redux"
import { ConstantType } from "./../../interfaces/constants.interface"
import { UserType } from "../../interfaces/user.interface"
import constants from "../../config/constants"
import { getUser, setUser } from "./../../actions/auth"
import Loading from "./../Loading"
import dispatchBoardsList from "./../../actions/dispatchBoardsList"

const mapStateToProps = (state: any) => {
  const { maxWidth, maxHeight } = state.nav
  return { maxWidth, maxHeight }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateDimensions: () => {
      const { setNav }: { setNav: ConstantType } = constants
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
    dispacthUserInfo: (user: UserType) => {
      const { id, email, lastname, firstname, token } = user
      setUser(token as string)
      const { userInfo }: { userInfo: ConstantType } = constants
      dispatch({
        type: userInfo.name,
        payload: { id, email, lastname, firstname },
      })
    },
  }
}

const IS_LOGGED = gql`
  query IsLogged($token: String!) {
    user(token: $token) {
      id
      email
      firstname
      lastname
      is_check
      isLogged
      token
    }
    getBoards(token: $token) {
      title
      description
      id
      created_at
      role
    }
  }
`

const LoggedLayout = ({
  children,
  updateDimensions,
  dispacthUserInfo,
  maxWidth,
  maxHeight,
}: any) => {
  const [isLogged, setIsLogged] = useState<Boolean>(true)
  const [boardsFetched, setBoardsFetched] = useState<Boolean>(false)
  const token = getUser()
  const { loading, error, data = {} }: any = useQuery(IS_LOGGED, {
    variables: { token },
  })

  useEffect(() => {
    window.addEventListener("resize", updateDimensions)

    // When request is over :
    if (Object.keys(data).length) {
      if (!isLogged) navigate("/login")
      if (!data.user.is_check)
        navigate(`/user/not_confirm?email=${data.user.email}`)
      setIsLogged(data.user.isLogged)
      dispacthUserInfo(data.user)
    } else if (error) {
      navigate("/login")
    }
  })

  useEffect(() => {
    updateDimensions()
  }, [])

  useEffect(() => {
    if (!boardsFetched && data.getBoards) {
      if (data.getBoards.length) {
        dispatchBoardsList(data.getBoards)
        setBoardsFetched(true)
      }
    }
  }, [data])

  return !loading && isLogged ? (
    <div id="logged-layout" style={{ maxWidth, maxHeight }}>
      {children}
    </div>
  ) : (
    <Loading />
  )
}

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps
)(LoggedLayout)
