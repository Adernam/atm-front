import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Container, Box, Typography, Grid,
} from '@mui/material'
import { AlertContext } from 'components/alert/AlertContext'
import { ClientDTO } from 'modules/auth/dto'
import { httpRequest } from 'utils/services/httpRequest'

import { FormSignin } from '../components/Form'

export function Signin() {
  const navigate = useNavigate()
  const { addAlert } = useContext(AlertContext)

  const submitForm = async (clientDto: ClientDTO) => {
    httpRequest
      .post('/client/signin', clientDto)
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          navigate('/operations')
        }
      })
      .catch((error) => {
        if (error.response?.data?.error === 'Invalid email or password') {
          return addAlert({
            message: 'Usuário ou senha inválidos',
            title: 'Falha ao efetuar login',
            type: 'error',
          })
        }

        addAlert({
          message: 'Falha inesperada ao efetuar login!',
          title: 'Falha',
          type: 'error',
        })
      })
  }

  return (
    <Container
      id="signInContainer"
      maxWidth="md"
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          container
          rowGap={2}
          sx={{ maxWidth: 500, paddingTop: 12 }}
        >
          <Grid
            item
            xs={12}
          >
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormSignin submit={submitForm} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
