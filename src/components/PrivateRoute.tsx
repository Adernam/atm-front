import React, { useCallback, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AxiosInterceptorsSetup } from 'utils/services/httpRequest'

import { AlertContext } from './alert/AlertContext'

interface PrivateRouteProps {
  render: JSX.Element
}

export function PrivateRoute({ render: Element }: PrivateRouteProps) {
  const { addAlert } = useContext(AlertContext)
  const navigate = useNavigate()

  const Interceptor = useCallback(() => {
    AxiosInterceptorsSetup(navigate, addAlert)
    return <></>
  }, [])

  return (
    <>
      <Interceptor />
      {Element}
    </>
  )
}
