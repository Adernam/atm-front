import React, { useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Container, Box, Typography, Grid } from '@mui/material'
import { AlertContext } from 'components/alert/AlertContext'
import { ClientDTO } from 'modules/auth/dto'
import { ClientsStore } from 'modules/home/store/Clients'

import { FormSignup } from '../components/Form'

export function Signup() {
  const clientStore = useMemo(() => new ClientsStore(), [])
  const navigate = useNavigate()
  const { addAlert } = useContext(AlertContext)

  const submitForm = async (clientDto: ClientDTO) => {
    try {
      const { token } = await clientStore.signup(clientDto)
      localStorage.setItem('token', token)
      addAlert({
        message: 'Cadastro realizado com sucesso!',
        title: 'Sucesso!',
        type: 'success',
      })

      navigate('/')
    } catch (error: any) {
      console.log('🚀 ~ file: Signup.tsx:19 ~ submitForm ~ token:', error)
      if (error.response?.data?.error === 'This client already exists') {
        return addAlert({
          message: 'Usuário já cadastrado',
          title: 'Falha ao criar usuário',
          type: 'error',
        })
      }

      addAlert({
        message: 'Falha inesperada ao efetuar login!',
        title: 'Falha',
        type: 'error',
      })
    }
  }

  return (
    <Container
      id='signUpContainer'
      maxWidth='md'
    >
      <Box
        component='div'
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
            <Typography variant='h4'>Cadastre-se</Typography>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormSignup submit={submitForm} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
