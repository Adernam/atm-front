import { NavigateFunction } from 'react-router-dom'

import axios from 'axios'
import { AlertType } from 'components/alert/Alert'

export const api = 'http://localhost:3003'

const base = axios.create({
  baseURL: api,
})

export const AxiosInterceptorsSetup = (
  navigate: NavigateFunction,
  addAlert: (alert: AlertType) => void
) => {
  const handleLogin = () => {
    navigate('/auth/signin')
  }

  base.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 &&
        error.response?.data?.error === 'Unauthorized'
      ) {
        addAlert({
          message: 'Sua sessão expirou, faça o login novamente.',
          title: 'Atenção',
          type: 'warning',
        })
        localStorage.removeItem('token')
        handleLogin()
      }
      return Promise.reject(error)
    }
  )

  base.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  })
}

export { base as httpRequest }
