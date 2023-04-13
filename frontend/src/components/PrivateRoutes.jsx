import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function PrivateRoutes() {

    const {token} = useSelector(state=>state.auth)

  return (
    token ? <Outlet/> : <Navigate to='/auth/login' replace />
  )
}

export default PrivateRoutes